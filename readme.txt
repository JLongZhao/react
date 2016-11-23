yeoman结合generator-react-webpack创建react脚手架，yo 


Module not found: Error: Cannot resolve module 'react/lib/ReactMount' in G:\


问题：ERROR in Cannot find module 'node-sass'
原因：node-sass 安装失败的解决措施，根本原因是国内网络的原因。
解决方法：通过淘宝的npm镜像安装node-sass
1、首先安装cnpm
$ npm install -g cnpm --registry=https://registry.npm.taobao.org  
2、然后安装node-sass
$ cnpm install node-sass  