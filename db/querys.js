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

pool.getRunner = async (userId) => {
  try {
    let runner = await pool.query(`SELECT * FROM runners WHERE "userId"=$1`, [userId]);
    let runs = await pool.query(`SELECT miles, time, "runDate" from runs WHERE "runnerId"=${runner.rows[0].id} ORDER BY "runDate" DESC`);
    let team = null;
    if(runner.rows[0].teamId !== null) {
      team = await pool.query(`SELECT name, charity, goal from teams WHERE "id=${runner.rows[0].teamId}"`)
    }
    return [runner.rows[0], runs.rows, team];
  } catch(err) {
    console.log('Error retreiving runner from DB', err);
  }
};

pool.createUser = async (signUpInfo, hash) => {
  try {
    let result = await pool.query(`INSERT INTO users("username", "password")  VALUES ($1, $2)`, [signUpInfo.username, hash])
    let user = await pool.query(`SELECT * FROM users WHERE "username"=$1`, [signUpInfo.username]);
    let runner = await pool.query(`INSERT INTO runners("userId", "name", "birthDate") VALUES ($1, $2, $3)`, [user.rows[0].id, signUpInfo.name, signUpInfo.birthDate]);
    runner = await pool.query(`SELECT * FROM runners WHERE "userId"=$1`, [user.rows[0].id])
    return runner;
  } catch(err) {
    console.log('Error adding user to DB', err)
  }
}

pool.deleteRun = async () => {

}

pool.updateRun = async () => {

}

module.exports = pool;