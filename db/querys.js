const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'anthony.casper',
  host: 'localhost',
  database: 'runAcross',
  password: 'hackreactor',
  port: 5432
})

pool.on('error', (err, client) => {
  console.err("Unexpected Error on idle client", err);
  process.exit(-1);
})

;(async () => {
  const client = await pool.connect();
  console.log("Connected to postgres client")

  client.release();
})().catch(err => console.log(err.stack));

pool.getUser = async (userName) => {
  try {
    let result = await pool.query(`SELECT * FROM users WHERE "username"=$1`, [userName]);
    return result;
  } catch(err) {
    console.log('Error retreiving user from DB', err);
  }
};

pool.createUser = async (userName, hash) => {
  try {
    let result = await pool.query(`INSERT INTO users("username", "password")  VALUES ($1, $2)`, [userName, hash])
    return result;
  } catch(err) {
    console.log('Error adding user to DB', err)
  }
}

pool.deleteRun = async () => {

}

pool.updateRun = async () => {

}

module.exports = pool;