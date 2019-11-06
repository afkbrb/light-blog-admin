# light-blog-admin

## 简介

Light Blog是一个前后端分离的轻量级个人博客系统，基于本人以前的同名项目[LightBlog](https://github.com/afkbrb/LightBlog)。

本博客系统由后台服务器系统(light-blog-back)、后台管理系统(light-blog-admin)、前端系统(light-blog-front)三个子系统组成。其中，后台服务系统基于SpringBoot，后台管理系统和前端系统均基于Vue。每个子系统的详细介绍可参看相应的Github地址。

本后台管理系统使用了[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)作为基础模板

## 技术栈

vue-cli + element-ui + mavon-editor + axios

## 传送门

- [后台服务系统(light-blog-back)](https://github.com/afkbrb/light-blog-back)
- [后台管理系统(light-blog-admin)](https://github.com/afkbrb/light-blog-admin)
- [前端系统(light-blog-front)](https://github.com/afkbrb/light-blog-front)
- [API](https://www.showdoc.cc/lightblog?page_id=2428180430024349)

## 截图

### 前台

![](./screenshots/1.png)

![](./screenshots/2.png)

![](./screenshots/3.png)

![](./screenshots/4.png)

### 后台

![](./screenshots/5.png)

![](./screenshots/6.png)

![](./screenshots/7.png)


## 构建和运行

```bash
git clone git@github.com:afkbrb/light-blog-admin.git
cd light-blog-admin
# 国内建议使用cnpm install
npm install
# 需要运行light-blog-back
# run前可根据实际情况修改.env.development和.env.production中相关内容
npm run dev
# 访问地址: http://localhost:8081,默认用户名：admin 密码：123456
# 打包
npm run build
```

## BlahBlah

如果本项目对您学习Vue或SpringBoot等有所帮助的话，请帮忙点颗⭐哦😁！

如果您对本项目有什么意见或建议，也欢迎批评指正。

## License

[MIT](https://github.com/afkbrb/light-blog-admin/blob/master/LICENSE)
