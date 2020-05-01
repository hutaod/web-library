# nginx

Mac 系统

## 安装 brew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

brew 一些简单命令：

```bash
# 更新brew
brew update

# 查看安装信息
brew -v

# 查看是否安装了nginx
brew info nginx
```

## 安装 nginx

```bash
brew install nginx
```

## nginx 常用命令

```bash

# 启动 - mac
nginx / systemctl start nginx

# 启动 - centos
systemctl start nginx

# 重启 - mac
nginx -s reload

# 重启 - centos
systemctl restart nginx
service nginx restart

# 停止 - mac
nginx -s stop

# 停止 - centos
systemctl stop nginx

# 检测 nginx
nginx -t

# 重载配置文件
nginx -s reload
```

centos 安装目录在/etc/nginx 在/etc/nginx/conf.d 目录，测试 nginx 是否正确 nginx -t

mac 安装目录在/usr/local/etc/nginx/

## 修改 nginx 初始页面信息

```bash
open /usr/local/var/www/
```

## 查看 nginx 的安装目录

```bash
open /usr/local/Cellar/nginx/
```

## 查看 nginx 的配置文件 nginx.conf

```bash
/usr/local/etc/nginx/
```

## nginx 安装和配置

[https://segmentfault.com/a/1190000018109309](https://segmentfault.com/a/1190000018109309)
[Mac 系统如何使用 Nginx](https://juejin.im/post/5bd2b8bce51d457a35658836)
