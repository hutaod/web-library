const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  console.log("method: ", req.method);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , language-id, country-id"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, data: 123 }));
  }

  if (req.method === "GET") {
    const url = req.url;
    console.log("url: ", url);
    req.query = querystring.parse(url.split("?")[1]);
    console.log("query: ", req.query);
    res.end(
      JSON.stringify({
        success: true,
        data: req.query,
      })
    );
  }

  if (req.method === "POST") {
    // 数据格式
    console.log("content-type", req.headers["content-type"]);
    // 接收数据
    let postData = "";
    req.on("data", (chunk) => {
      console.log(chunk);
      postData += chunk.toString();
    });
    req.on("end", () => {
      console.log(postData);
      res.end(
        JSON.stringify({
          success: true,
          data: "hello world",
        })
      );
      // res.end('hello world') // 在这里返回，因为是异步
    });
  }
});

server.listen(3000, () => {
  console.log("server on 3000");
});
