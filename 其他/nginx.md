# nginx

## nginx 常用命令
```bash

# 启动
systemctl start nginx
# 停止
systemctl stop nginx
# 重启
systemctl restart nginx
service nginx restart
# 检测 nginx
nginx -t
# 重载配置文件
nginx -s reload
```

列：在/etc/nginx/conf.d 目录，测试 nginx 是否正确 nginx -t
