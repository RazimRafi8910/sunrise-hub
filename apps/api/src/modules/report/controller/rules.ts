import type { Request, Response } from 'express';
import { getRulesFromDb } from '../report.service.js';
import ApiResponse from '../../../lib/apiResponse.js';
import ApiError from '../../../lib/apiError.js';
import { createRuleDb } from '../services/rules.js';
import { ERROR_CODES, ERROR_STATUS } from '@sunrise-hub/shared';

export const getAllRules = async (req: Request, res: Response) => {
  const { id } = req.params
  const rules = await getRulesFromDb(id as string);
  console.log(`[report][getAllRules] rules returned`)
  return ApiResponse.ok(rules, "rules returned").send(res);
}


export const createRule = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const result = await createRuleDb(name, description);

  if (result == null) {
    return new ApiError(ERROR_CODES.FAILED_TO_CREATE, "failed to create rule");
  }
  console.log(`[report][createRule] rules ${result.id} created`)
  return ApiResponse.created(result).send(res)
}
