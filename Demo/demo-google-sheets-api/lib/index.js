const auth = require("./auth")

class GoogleSheets {
  constructor(credentialsFile) {
    this.sheets = google.sheets({ version: "v4" })
    this.auth = null
    auth(credentialsFile, auth => {
      this.auth = auth;
      this.sheets = google.sheets({ version: "v4", auth });
    })
  }
}

module.exports = GoogleSheets