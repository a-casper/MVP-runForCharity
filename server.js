const express = require('express');
const path = require('path');
const db = require('./db/querys.js')
const bcrypt = require('bcrypt')

//authentication
const saltRounds = 10;

const app = express();
const port = 5000;

app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use(express.static(path.join(__dirname, '.', 'client', 'dist')));

app.post('/login', async (req, res) => {
  let userInfo = await db.getUser(req.body.username);
  let user = userInfo.rows[0];
  if(user === undefined) {
    res.status(404).send('Username does not exist');
  } else {
    bcrypt.compare(req.body.password, user.password, async (err, result) => {
      if(err) {
        console.log('error comparing in bcrypt', err);
      } else if (result) {
        //valid user, now I need to send back the user, team, and rundata
        runnerInfo = await db.getRunner(user.id);
        res.status(202).send(runnerInfo);
      } else {
        res.status(401).send('Incorrect Passord');
      }
    });
  }
})

app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if(err) {
      console.log('Error hashing!', err);
      res.sendStatus(404);
    }
    try{
      let result = await db.createUser(req.body, hash);
      res.status(200).send(result.rows);
    } catch(err) {
      console.log('Error creating User', err);
      res.sendStatus(500);
    }
  });
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
