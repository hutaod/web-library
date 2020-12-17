// const EventEmitter = require("events").EventEmitter;
const { google } = require("googleapis");
const auth = require("./checkAndGetAuth")

const scopeHost = "https://www.googleapis.com/auth/";
const SCOPES = ["spreadsheets.readonly"].map(scope => `${scopeHost}${scope}`);

/**
 * 翻译转换工具
 */
class GoogleSheetsConverTools {
  constructor({ credentialsFile, method = "json", scopes }) {
    // 初始化数据
    this.sheets = google.sheets({ version: "v4" })
    this.auth = null
    this.credentialsFile = credentialsFile;
    this.method = method;
    this.scopes = Array.isArray(scopes) ? scopes.map(scope => `${scopeHost}${scope}`) : SCOPES;
  }

  // 授权
  async asyncAuth() {
    if (this.auth) {
      return this.sheets;
    }
    return new Promise((resolve) => {
      auth({ credentialsFile: this.credentialsFile, scopes: this.scopes }, auth => {
        this.auth = auth;
        this.sheets = google.sheets({ version: "v4", auth });
        resolve(this.sheets);
      })
    })
  }
  
  /**
   * 转化sheets为json文件
   * @param {object}
   *  - spreadsheetId 谷歌Excel文档id
   *  - range 范围、工作表名称
   *  - jsonPath 导出json地址
   */
  async asyncTransToJson({ spreadsheetId, range, jsonPath, ...rest }) {
    // 获取sheets
    const sheets = await this.asyncAuth();
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId, range, ...rest
      })
      const rows = res.data.values;
      if (rows.length) {
        console.log("Name, Major:");
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map((row) => {
          console.log(JSON.stringify(row));
        });
      } else {
        console.log("No data found.");
      }
    } catch (err) {
      throw Error("The API returned an error: " + err)
    }
  }
}

module.exports = GoogleSheetsConverTools