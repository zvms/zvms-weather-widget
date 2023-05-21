
import Koa from "koa";

const app = new Koa();

var catchedBody = null;
/*
app.listen(4001, () => {
  console.log("open server localhost:4001");
});
*/
app.use(async (ctx) => {
  ctx.body = catchedBody ?? "Initializing, please refresh seconds later.";
})

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT} .`)
})

import Axios from "axios";
import { rainMessageTable, condMessageTable } from "./messages.js";
import KEY from "./private_key.js"

const LOCATION = "121.714351,29.952756"

async function updateBody() {
  try {
    console.log(`\n\n\nupdating. [${Date()}]`);
    const url24h = `https://devapi.qweather.com/v7/grid-weather/24h?key=${KEY}&location=${LOCATION}`;
    const url7d = `https://devapi.qweather.com/v7/grid-weather/7d?key=${KEY}&location=${LOCATION}`;
    console.log(url24h, url7d);
    const response24h = await Axios.get(url24h);
    const response7d = await Axios.get(url7d);
    console.log("API called.");
    const isErr24h = response24h.status !== 200 || response24h.data.code !== "200";
    const isErr7d = response7d.status !== 200 || response7d.data.code !== "200"
    if (isErr24h || isErr7d) {
      const response = isErr24h ? response24h : response7d;
      throw Error(`
      <!DOCTYPE html>
      <h1>天气服务出错啦</h1>
      <p>错误码：${response.status} (${response.data.code})</p>
      <p>错误信息：${response.statusText}</p>
      <p>请稍后再试</p>
    `);
    }

    const weather24h = response24h.data;
    const weather7d = response7d.data;

    let newBody = "";
    newBody += `<!DOCTYPE html>`
    newBody += "<h3>天气预报（位置：镇海中学）</h3>";
    newBody += `24hours数据更新于${new Date(weather24h.updateTime).toLocaleString()}<br/>`
    newBody += `7days数据更新于${weather7d.updateTime}`
    newBody += "<ul>";
    for (const { fxTime, temp, text, precip } of weather24h.hourly) {
      //const date=fxTime.slice(5,10);
      //const hour=parseInt(fxTime.slice(11,13));
      //const minute=fxTime.slice();
      newBody += `<li>`
      newBody += `小时预报：<strong>${(new Date(fxTime)).toLocaleString()}</strong><br/>`
      newBody += `气温：${temp}<br/>`
      newBody += `天气状况：${text}<br/>`
      newBody += `降水量：${precip}mm`
      newBody += `</li>`
    }
    for (const { textDay, textNight, tempMax, tempMin, precip, fxDate } of weather7d.daily) {
      newBody += `<li>`
      newBody += `每日预报：<strong>${fxDate}</strong><br/>`
      newBody += `气温：${tempMin}℃ ~ ${tempMax}℃<br/>`
      newBody += `天气状况：<ul><li>白天：${textDay ?? "<UNKNOWN>"}</li>`
      newBody += `<li>夜晚：${textNight ?? "<UNKNOWN>"}</li></ul>`
      newBody += `降水：${precip}mm <br/>`
      //newBody += `风速：${wns}m/s<br/>`
      newBody += `</li>`;
    }
    newBody += "</ul>";
    newBody += "数据来源： 和风天气（www.seniverse.com）<br/>"
    newBody += "抱歉—— _Kerman真的懒得写好看的UI了，将就着看吧~"
    catchedBody = newBody;
  } catch (e) {
    catchedBody = "ERROR: " + e;
  }
  console.log("UPDATED:\n", catchedBody)
}


updateBody();
const _1s = 1000;
const _1m = 60 * _1s;
const _1h = 60 * _1m;
setInterval(updateBody, _1h);
