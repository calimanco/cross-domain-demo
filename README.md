# cross-domain-demo

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 简介

本项目包含三个服务器，均使用 NodeJS 开发，可在本地演示下列跨域的方案。  
配合本人的博客文章食用更加：[传送门](https://segmentfault.com/a/1190000014223524) 。

- [x] JSON-P（自填充 JSON）
- [x] HTML-P/MockForm（自填充 HTML/模拟表单）
- [x] SubHostProxy（子域名代理）
- [x] WindowHash
- [x] WindowName
- [ ] PostMessage
- [ ] CORS

## 安装

如果你只是演示用，只安装 dependencies 的包即可。

```
npm install --production
```

## 使用

请先将下面内容写入本地 host 文件。

```text
127.0.0.1 demo.com
127.0.0.1 api.demo.com
```

启动服务器。

```bash
npm start
```

上面命令将并行启动三个服务器，也可以分开启动。

```bash
npm run proxy
npm run server1
npm run server2
```

打开浏览器访问 `demo.com`。

## 服务器说明

- proxy  
  反向代理服务器，监听本地 80 端口，用于将不同域名指向另外两个服务。
- server1  
  Web 服务器，监听本地 3000 端口，演示域名为 `demo.com`。
- server2  
  API 服务器，监听本地 4000 端口，演示域名为 `api.demo.com`。

基本原理就是访问 `demo.com` 的页面，页面将请求 `api.demo.com` 的接口。  
`demo.com` 和 `api.demo.com` 属于不同域，要完成请求就必须进行跨域操作。  
大部分跨域方案需要客户端（Web 端）和服务器端相互配合才能完成。

## 提示

本项目代码均不建议用于生产环境，仅作为思路参考。
