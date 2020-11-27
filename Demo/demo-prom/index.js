const createServer = require("./server/createServer")

createServer({
  port: "8091",
  wwwroot: ""
})

// 开始性能检查
startPromCollect();

function startPromCollect() {
  // 引入性能检测
  const promClient = require("prom-client");
  const address = require("address");
  // pushgateway 地址
  const pushIp = "http://localhost:9191";
  const jobName = "test-haha";

  const gateway = new promClient.Pushgateway(pushIp);
  // 收集默认数据
  promClient.collectDefaultMetrics();
  // 30秒push一次
  setInterval(() => {
    gateway.push({ jobName: jobName, groupings: { instance: address.ip() } }, (err, resp, body) => {
      if (err) {
        console.error(`prometheus Pushgateway pushError: ${err}`);
      }
    });
  }, 30000);
}
