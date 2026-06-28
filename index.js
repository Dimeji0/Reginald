const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});
app.command("/reginald-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/reginald-ping - Check bot latency
/reginald-catfact - Get a cat fact`
  });
});
app.command("/reginald-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Factoid:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});
app.command("/reggie-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Yoo wsgg gngg!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

