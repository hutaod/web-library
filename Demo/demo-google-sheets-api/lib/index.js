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
}

module.exports = TransleteConverTools