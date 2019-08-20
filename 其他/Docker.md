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
[Docker 安装 MongodDB](https://blog.csdn.net/xiaojin21cen/article/details/84994452)

```bash
docker run  \
--name mongodb \
-p 27017:27017  \
-v ~/mongo/configdb:/data/configdb/ \
-v ~/mongo/db/:/data/db/ \
-d mongo --auth

docker exec -it mongodb mongo admin

db.createUser({ user: 'admin', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });


```
