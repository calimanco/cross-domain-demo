# cross-origin-demo

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 简介

跨源（跨域）方案的演示集合（下统一称跨源），可在本地演示下列方案，包含前后端完整代码。  
后端主要基于 Express 开发，前端不依赖任何第三方，源码带有完善注释，力求用最直接简洁的方式让使用者学会跨源方案的原理。  
配合本人的解析原理的博客文章食用更加：[传送门](https://segmentfault.com/a/1190000040070036) 。

- [x] JSON-P（自填充 JSON）
- [x] HTML-P/MockForm（自填充 HTML/模拟表单）
- [x] SubHostProxy（子域名代理）
- [x] WindowHash
- [x] WindowName
- [x] PostMessage
- [x] CORS / Cross-origin resource sharing（跨源资源分享）

## 安装

克隆到本地。

```bash
git clone https://github.com/calimanco/cross-origin-demo.git
cd cross-origin-demo
```

如果你只是演示用，只安装 dependencies 的包即可。

```bash
npm install --production
```

## 使用

请先将下面内容写入本地 hosts 文件。  
Win 系统一般是在 `c:\windows\system32\drivers\etc\hosts`。  
Mac/Linux 系统一般是在 `/etc/hosts`。

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

![index](https://calimanco.github.io/cross-origin-demo/index.png)

点击上面的连接即可进入该跨源方案的案例界面。

![index](https://calimanco.github.io/cross-origin-demo/page.png)

## 服务器布局

本项目共包含三个服务器，均使用 NodeJS 开发，无需依赖其他容器或服务。  
基本流程是访问 `demo.com` 的页面，页面将请求 `api.demo.com` 的接口，要完成请求就必须进行跨源操作。

- proxy  
  反向代理服务器，监听本地 80 端口，用于将不同域名指向另外两个服务。
- server1  
  Web 服务器，监听本地 3000 端口，演示域名为 `demo.com` ，提供静态页面和资源。
- server2  
  API 服务器，监听本地 4000 端口，演示域名为 `api.demo.com` ，包含 Pug 模板渲染器，提供接口供页面调用。

![server-layout](https://calimanco.github.io/cross-origin-demo/server-layout.png)

## 目录结构

```text
├── proxy.js                      // 反向代理服务器
├── server1                       // Web 服务器
│   ├── main.js                   // Web 服务器主文件
│   ├── pages                     // 页面目录
│   │   ├── JSONP                 // 每一个跨源方案单独一个目录
│   │   │   ├── index.html        // 该跨源方案的入口
│   │   │   └── request-JSONP.js  // 该跨源请求方法的 Promise 封装
│   │   ├── MockForm
│   │   ├── ...
│   │   └── index.html            // 首页，会列出所有跨源方案的入口
│   └── public                    // 静态资源，包含公共的 JS 和 CSS
└── server2                       // API 服务器
    ├── main.js                   // API 服务器主文件
    ├── router.js                 // 路由集合（接口）
    └── templates                 // 模板目录，render 方法的默认目录
```

## 关于取得 iframe 加载状态的 hack 方法

由于同源限制，如果 iframe 内是非同源（domain）的页面，父级页面是无法读取 document 的。  
因此利用 iframe 的 onload 事件检查 iframe 内是否加载完毕是不可靠的。  
本项目为了解决该问题，给所有 iframe 内页面都加了一个隐藏的 iframe 标签，利用 window.length，来检测页面是否被加载。  
window.length 返回的是当前页面内 iframe 的数量，如果成功加载，那将返回 1，如果无法加载，则返回 0，此方法缺点就是无法获取准确的服务器状态（服务器返回的状态码），只能统称为"网络错误"。

```javascript
iframe.onload = function (event) {
  // We cannot get accurate server status.
  if (event.target.contentWindow.length === 0) {
    // We should throw network error here.
    return
  }
  // do something
}
```

## 提示

本项目以演示原理为目的，兼容性不作为编码考虑，代码仅在 Chrome 浏览器和 NodeJS v14+ 测试过，其他的版本环境和浏览器请自行兼容。  
本项目代码均不建议直接用于生产环境，仅作为思路参考。
