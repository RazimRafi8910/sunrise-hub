import app from "./app.js";


function startServer() {
  app.listen(3001, () => {
    console.log("server is running");
  })
}
