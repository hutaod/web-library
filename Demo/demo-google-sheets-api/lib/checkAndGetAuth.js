const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const TOKEN_PATH = "token.json"; // 存储的token文件地址

/**
 * 使用给定的的 credentials(凭据) 创建一个 OAuth2 客户端, 然后执行给定的回调函数
 * @param {Object} credentials 授权客户端凭据
 * @param {function} callback 授权成功后的回调
 */
function authorize(credentials, scopes, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // 检查我们之前是否已存储令牌(token)
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, scopes, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * 提示用户授权后获取并存储新令牌, 然后使用授权的OAuth2客户端执行给定的回调。
 * @param {google.auth.OAuth2} oAuth2Client 要为其获取令牌的OAuth2客户端
 * @param {getEventsCallback} callback 授权客户端的回调。
 */
function getNewToken(oAuth2Client, scopes, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // 将token存储到磁盘，以便于以后执行程序
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

module.exports = function checkAndGetAuth({ credentialsFile, scopes }, callback) {
  fs.readFile(credentialsFile, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // 使用credentials获取客户端授权, 以便于可访问Google Sheets API.
    authorize(JSON.parse(content), scopes, callback);
  });
}