import axios from "axios";

export default (key: string | undefined, text: string, desp: string = "") => {
  if (!key) return;
  const url = `https://sc.ftqq.com/${key}.send`;
  axios.get(url, {
    params: {
      text: `蘑菇钉：${text}`,
      desp
    }
  })
};
