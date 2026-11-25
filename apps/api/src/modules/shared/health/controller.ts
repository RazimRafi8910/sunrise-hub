import type { Request, Response } from "express"
import { uptime } from "process";

export type HealthCheck = () => Promise<unknown>

const callWithTimeOut = <T>(p:Promise<T>,ms:number) => {
  return Promise.race([
    p,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("timeout")), ms);
    })
  ])
}

export function healthController(
  module: string,
  checks: Record<string, HealthCheck> = {},
  timeOutMs: number = 3000
) {
  return async (req: Request, res: Response) => {
    const entires = Object.entries(checks);
    console.log("from health check :")
    console.log(entires)
    const result = await Promise.allSettled(
      entires.map(([_,check]) => callWithTimeOut(check(), timeOutMs))
    )

    const details: Record<string, "up" | "down"> = {}
    result.forEach((r, i) => {
      const name = entires[i]?.[0] || "unkown"
      details[name] = r.status == "fulfilled" ? "up" : "down"
    });

    const healthy = Object.values(details).every((s)=> s == 'up')
    res.status(healthy ? 200 : 503).json({
      moduleName: module,
      status: healthy ? "ok" : "degraded",
      details: details,
      uptime: process.uptime(),
    });
  }
}
