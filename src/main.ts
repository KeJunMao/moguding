import { MoguApi } from "./api/base";
import { users } from "../mogu.config.json";
import send from "./api/serverchan";
import schedule from "node-schedule";

console.log(`读取用户配置：${users.map(v => v.name)}`);
const task = () => {
  users.forEach(async ({ phone, password, name, clock, serverChan }) => {
    const mogu = new MoguApi();
    const token = await mogu.getToken(phone, password);
    if (token) {
      mogu.setToken(token);
      mogu.fly
        .post("/attendence/clock/v1/save", {
          ...clock,
          country: "中国",
          planId: "eba372dc30851c3573f9758d07581a0c",
          type: "START",
          device: "Android",
          latitude: "40.053743",
          longitude: "116.325571"
        })
        .then(() => {
          console.log(`${name}: 签到成功`);
          send(serverChan, `签到成功`, `> ${clock.address}`);
        })
        .catch(() => {
          console.log(`${name}: 签到失败`);
          send(serverChan, `签到失败`);
        });
    } else {
      console.log(`${name}: 签到失败`);
      send(serverChan, `签到失败`);
    }
  });
};
const rule = "0 0 10 * * *";
console.log(`当前规则为: ${rule}`);

const scheduleCronstyle = () => {
  schedule.scheduleJob(rule, task);
};
console.log("自动签到服务任务等待规则触发！");
scheduleCronstyle();
