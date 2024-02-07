const { Client } = require("pg");
let client;
(async function connect() {
  const conString = process.env.POSTGRESURL;
  client = new Client({ connectionString: conString });
  await client.connect();
  console.log("postgres connected")
})();
// establish connect at server start

async function fetchData(query, values) {
  try {
    const result = await new Promise((resolve, reject) => {
      client.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result;
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = fetchData;
