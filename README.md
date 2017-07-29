# toutiao-lite
> 这是个移动端新闻WebApp，使用vue.js 2.0框架开发

## 技术栈
vue + vuex + vue-router + es6 + flexible + sass + webpack

## 运行(nodejs 6.0+)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 说明
1. 使用今日头条的jsonp接口获取数据，接口详情：https://github.com/iMeiji/Toutiao/wiki/%E4%BB%8A%E6%97%A5%E5%A4%B4%E6%9D%A1Api%E5%88%86%E6%9E%90
2. 界面模仿今日头条的移动站界面
3. 实现了顶部下拉加载和底部曝光加载
4. 由于接口原因，新闻内容返回图片较大，请在wifi下测试

## 在线地址
[预览(请用chrome的移动端模式浏览)](https://ph2017.github.io/vue_toutiao_lite/dist/#/home/hot?type=news_hot)

### 移动端二维码(多图预警)
![加载错误，请在src/static/screenShot中查看](./static/screenShot/vue_lite_githubPages.png)

## 项目截图
![加载错误，请在src/static/screenShot中查看](./static/screenShot/screenShot1.png)![加载错误，请在src/static/screenShot中查看](./static/screenShot/screenShot2.png)

## 最后
> 本项目主要理解 vue 和 vuex 的原理，以及 vue + vuex 之间的配合方式
> 如果觉得不错的话，您可以点右上角 "Star" 支持一下 谢谢！ ^_^


