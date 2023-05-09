import oracledb from "oracledb";

let conn;
if (process.platform === "win32") {
  try {
    oracledb.initOracleClient({ libDir: "../instantclient_21_9" }); // note the double backslashes C:\Users\visha\Desktop\instantclient_21_9
      conn = await oracledb.getConnection({
      user: "sostest",
      password: "S0stesT321",
      connectionString: "129.154.234.192:1521/sosdb",
    });
  } catch (err) {
    console.error("Whoops!");
    console.error(err);
    process.exit(1);
  }
}

export default conn;