import app from "./app.ts";


function startServer() {
  app.listen(3001, () => {
    console.log("server is running");
  })
}
