# cross-domain-demo

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 简介

本项目可在本地演示下列的跨域方案，包含完整代码（前端+后端）。  
后端主要基于 express 开发，前端不依赖任何第三方，源码带有完善注释，力求用最直接简洁的方式让使用者学会跨域方案的原理。  
配合本人的解析原理的博客文章食用更加：[传送门](https://segmentfault.com/a/1190000014223524) 。

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

## 服务器布局

本项目共包含三个服务器，均使用 NodeJS 开发，无需依赖其他容器或服务。  
基本流程是访问 `demo.com` 的页面，页面将请求 `api.demo.com` 的接口，要完成请求就必须进行跨域操作。  

- proxy  
  反向代理服务器，监听本地 80 端口，用于将不同域名指向另外两个服务。
- server1  
  Web 服务器，监听本地 3000 端口，演示域名为 `demo.com` ，提供静态页面和资源。
- server2  
  API 服务器，监听本地 4000 端口，演示域名为 `api.demo.com` ，包含 Pug 渲染器，提供接口供页面调用。
  

## 提示

本项目以演示原理为目的，兼容性不作为编码考虑，代码仅在最新 Chrome 浏览器和 NodeJS v14+ 测试过，其他的版本环境和浏览器请自行兼容。  
本项目代码均不建议直接用于生产环境，仅作为思路参考。
