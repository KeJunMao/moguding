# 蘑菇钉爱室友版本

支持多用户，微信推送，自定义签到信息

## 依赖

- node 必须
- yarn 必须
- pm2 可选

## 安装

```bash
git clone https://github.com/KeJunMao/moguding
cd moguding
yarn
```

## 构建

```bash
yarn build
```

## 配置

复制 `mogu.config.json.template` 为 `mogu.config.json` 并将其中的内容改为自己的信息，支持多用户。

- phone 蘑菇钉手机号
- password 蘑菇钉密码
- name 配置名称
- clock 签到数据
  - address
  - province
  - city
  - description
- serverChan [server 酱](http://sc.ftqq.com/3.version) Key 用于微信推送

## 运行

```bash
node dist/main.js
```

## 后台运行

依赖 [pm2](https://www.npmjs.com/package/pm2) 守护

```bash
pm2 start dist/main.js
```
