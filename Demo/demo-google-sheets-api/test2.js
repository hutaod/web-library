const path = require("path");
const GoogleSheets = require("./lib");

console.log(path.resolve("./credentials.json"));

async function main() {
  const googleSheets = new GoogleSheets({
    credentialsFile: path.resolve("./credentials.json"),
  });

  const res = await googleSheets.asyncTransToJson({
    spreadsheetId: "1yqFL4bwGQGBGUXbtIx382mTcHhPPrRgQAPyB3vt-IWY",
    range: "工作表2",
  });
  console.log(111, res);
  // sheets.spreadsheets.values.get(
  //   {
  //     spreadsheetId: "1yqFL4bwGQGBGUXbtIx382mTcHhPPrRgQAPyB3vt-IWY",
  //     range: "工作表2",
  //   },
  //   (err, res) => {
  //     if (err) return console.log("The API returned an error: " + err);
  //     const rows = res.data.values;
  //     if (rows.length) {
  //       console.log("Name, Major:");
  //       // Print columns A and E, which correspond to indices 0 and 4.
  //       rows.map((row) => {
  //         console.log(JSON.stringify(row));
  //       });
  //     } else {
  //       console.log("No data found.");
  //     }
  //   }
  // );
}

main();
