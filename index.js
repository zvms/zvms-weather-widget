
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

const LOCATION = "29.952756:121.714351"


async function updateBody() {
  try {
    //https://seniverse.com
    const response = await Axios.get(`https://api.seniverse.com/v4?fields=weather_daily&key=${KEY}&locations${LOCATION}`);
    if (response.status !== 200) {
      throw Error(`
      <!DOCTYPE html>
      <h1>天气服务出错啦</h1>
      <p>错误码：${response.status}</p>
      <p>错误信息：${response.statusText}</p>
      <p>请稍后再试</p>
    `);
    }

    // const response = {
    //   data: {
    //     "weather_daily": [
    //       {
    //         "time_updated": "2021-05-10T15:02:33+08:00",
    //         "location": {
    //           "query": "40.008182:116.463223"
    //         },
    //         "data": [
    //           {
    //             "clo": 57,
    //             "gust": 3.87,
    //             "pre": 0.00,
    //             "prs_qfe": 1005.05,
    //             "rhu": 57.18,
    //             "tem_max": 27.4,
    //             "tem_min": 14.9,
    //             "time": "2021-05-11T08:00:00+08:00",
    //             "vis": 23.91,
    //             "wep_day": 1003,
    //             "wep_night": 1003,
    //             "wnd": 103,
    //             "wns": 2.19,
    //             "wns_grd": 2
    //           },
    //           {
    //             "clo": 60,
    //             "gust": 4.50,
    //             "pre": 0.00,
    //             "prs_qfe": 1005.71,
    //             "rhu": 56.85,
    //             "tem_max": 25.0,
    //             "tem_min": 13.0,
    //             "time": "2021-05-12T08:00:00+08:00",
    //             "vis": 24.14,
    //             "wep_day": 1003,
    //             "wep_night": 1003,
    //             "wnd": 146,
    //             "wns": 2.73,
    //             "wns_grd": 20
    //           }]
    //       }]
    //   }
    // }

    const weatherDaily = response.data["weather_daily"][0];

    let newBody = "";
    // newBody += "<h1>当前天气（位置：镇海中学）</h1>";
    // newBody += "<ul>";
    // for (const { name, value } of response.data.results[0].now) {
    //   newBody += `<li>${name}：${value}</li>`;
    // }
    // newBody += "</ul>";
    newBody += `<!DOCTYPE html>`
    newBody += "<h3>天气预报（位置：镇海中学）</h3>";
    newBody += `数据更新时间：${weatherDaily.time_updated}`
    newBody += "<ul>";
    for (const { wep_day, wep_night, tem_max, tem_min, pre, phs, time, wns } of weatherDaily.data) {
      newBody += `<li>`
      newBody += `<strong>${time.slice(0, 10)}</strong><br/>`
      newBody += `气温：${tem_min}℃ ~ ${tem_max}℃<br/>`
      newBody += ` 天气状况：<ul><li>白天：${condMessageTable[wep_day] ?? "<UNKNOWN>"}</li>`
      newBody += `<li>夜晚：${condMessageTable[wep_night] ?? "<UNKNOWN>"}</li></ul>`
      newBody += `降水：${rainMessageTable[phs]} （${pre}mm）<br/>`
      newBody += `风速：${wns}m/s<br/>`
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

setInterval(updateBody, 1000 * 60 * 60 * 3);