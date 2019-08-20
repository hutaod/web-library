# docker 使用

## docker 实例

### docker 安装 mysql

```bash
# docker 中下载 mysql
docker pull mysql

#启动
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=abc123456! -d mysql

#进入容器
docker exec -it mysql bash

#登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'abc123456!';

#添加远程登录用户
CREATE USER 'test'@'%' IDENTIFIED WITH mysql_native_password BY 'abc123456';

# 设置权限
GRANT ALL PRIVILEGES ON *.* TO 'test'@'%';
```

参考：
[Docker 安装 MySQL](https://www.runoob.com/docker/docker-install-mysql.html)
