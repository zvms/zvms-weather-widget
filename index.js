const Koa = require("koa");

const app = new Koa();

app.listen(4001, () => {
  console.log("open server localhost:4001");
});


import http from 'http';

time_start = input("请输入你想要获取的初始时间（格式YYYYMMDDHHMMSS）：")
time_over = input("请输入你想要获取的结束时间（格式YYYYMMDDHHMMSS）：")
apiid = '530353273471BLYFf'
password = 'EK6WqjT'
url = 'http://api.data.cma.cn:8090/api?'
timeRange = '[' + time_start + ',' + time_over + ']'
staIDs = city[city_name]
elements = 'Station_Id_C,Year,Mon,Day,Hour,PRS,PRS_Sea,PRS_Max,PRS_Min,TEM,TEM_Max,TEM_Min,RHU,RHU_Min,VAP,PRE_1h,WIN_D_INST_Max,WIN_S_MAX,WIN_D_S_Max,WIN_S_Avg_2mi,WIN_D_Avg_2mi,WEP_Now,WIN_S_Inst_Max'
url = url + 'userId=' + apiid + '&pwd=' + password + '&dataFormat=json&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_MUL_HOR&timeRange=' + timeRange + '&staIDs=' + staIDs + '&elements=' + elements
response = urllib.request.urlopen(url)
html = response.read()
target = json.loads(html)
if len(time_start) == 14 and len(time_over) == 14:
for i in range(len(target['DS'])):
  data = target['DS'][i]
print("\n城市：" + city_name)
print("日期：" + data['Year'] + "年" + data['Mon'] + "月" + data['Day'] + "日")
print("时间：" + data['Hour'] + ":00")
print("温度/气温：" + data['TEM'] + "摄氏度（℃）")
print("最高气温：" + data['TEM_Max'] + "摄氏度（℃）")
print("最低气温：" + data['TEM_Min'] + "摄氏度（℃）")
print("相对湿度：" + data['RHU'] + "%")
print("最小相对湿度：" + data['RHU_Min'] + "%")
print("水汽压：" + data['VAP'] + "百帕")
print("降水量：" + data['PRE_1h'] + "mm")
print("极大风速：" + data['WIN_S_Inst_Max'] + "m/s")
print("极大风速的风向（角度）：" + data['WIN_D_INST_Max'] + "°")
print("最大风速：" + data['WIN_S_MAX'] + "m/s")
print("最大风速的风向（角度）：" + data['WIN_D_S_Max'] + "°")
print("2分钟平均风速：" + data['WIN_S_Avg_2mi'] + "m/s")
print("2分钟平均风向（角度）：" + data['WIN_D_Avg_2mi'] + "°\n")