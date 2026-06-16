const app = require("./src/app");
const env = require("./src/config/env");

app.listen(env.PORT, () => {
  console.log(`Node backend running on http://127.0.0.1:${env.PORT}`);
});