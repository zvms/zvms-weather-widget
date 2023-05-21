
import Koa from "koa";

const app = new Koa();

var catchedBody = null;

app.listen(4001, () => {
  console.log("open server localhost:4001");
});

app.use(async (ctx) => {
  ctx.body = catchedBody ?? "Initializing, please refresh seconds later.";
})

import Axios from "axios";
import { rainMessageTable, condMessageTable } from "./messages.js";
import KEY from "./private_key.js"

const LOCATION = "121.714351,29.952756"


async function updateBody() {
  try {
    const url = `https://devapi.qweather.com/v7/grid-weather/7d?key=${KEY}&location=${LOCATION}`;
    console.log("GET", url)
    const response = await Axios.get(url);
    if (response.status !== 200 || response.data.code !== "200") {
      throw Error(`
      <!DOCTYPE html>
      <h1>天气服务出错啦</h1>
      <p>错误码：${response.status} (${response.data.code})</p>
      <p>错误信息：${response.statusText}</p>
      <p>请稍后再试</p>
    `);
    }

    const weatherDaily = response.data;

    let newBody = "";
    // newBody += "<h1>当前天气（位置：镇海中学）</h1>";
    // newBody += "<ul>";
    // for (const { name, value } of response.data.results[0].now) {
    //   newBody += `<li>${name}：${value}</li>`;
    // }
    // newBody += "</ul>";
    newBody += `<!DOCTYPE html>`
    newBody += "<h3>天气预报（位置：镇海中学）</h3>";
    newBody += `数据更新时间：${weatherDaily.updateTime}`
    newBody += "<ul>";
    for (const { textDay, textNight, tempMax, tempMin, precip, phs, fxDate, wns } of weatherDaily.daily) {
      newBody += `<li>`
      newBody += `<strong>${fxDate}</strong><br/>`
      newBody += `气温：${tempMin}℃ ~ ${tempMax}℃<br/>`
      newBody += ` 天气状况：<ul><li>白天：${textDay ?? "<UNKNOWN>"}</li>`
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
}


updateBody();
const _1s = 1000;
const _1m = 60 * _1s;
const _1h = 60 * _1m;
setInterval(updateBody, _1h);