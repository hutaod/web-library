#!/usr/bin/env bash
npm config get registry #检测仓库镜像
npm config set registry=http://registry.npmjs.org
echo '请进行登录相关操作：'
npm login #登录
echo "-------publishing-------"
npm publish #发布
npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
echo "发布完成"
exit