import axios from "axios";
import https from 'https';
export class MoguApi {
  public fly = axios.create({
    baseURL: "https://api.moguding.net:9000",
    headers: {
      "accept-language": "zh-CN,zh;q=0.8",
      "user-agent":
        "Mozilla/5.0 (Linux; U; Android 9; zh-cn; ONEPLUS A6010 Build/PKQ1.180716.001) AppleWebKit/533.1 (KHTML, like Gecko) Version/5.0 Mobile Safari/533.1",
      authorization: " ",
      rolekey: "",
      "content-type": "application/json; charset=UTF-8",
      "cache-control": " no-cache"
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
  });
  constructor() {
    this.fly.interceptors.response.use(response => {
      return response.data.data;
    });
  }
  getToken(phone: string, password: string) {
    return this.fly
      .post("/session/user/v1/login", {
        password,
        phone,
        loginType: "android",
        uuid: ''
      })
      .then(data => (data as any).token || "")
      .catch(() => "");
  }
  setToken(token: string) {
    this.fly.interceptors.request.use(config => {
      config.headers.authorization = token;
      return config;
    });
  }
}
