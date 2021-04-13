const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const token = require('jsonwebtoken');
const bcrypts = require('bcryptjs');
const app = express();
const router = express.Router();
const secretKey = 'secret1234'
const db = require('./src/config/db.js');
const { FindUserWithEmail } = require('./src/config/db.js');

function authenticateToken(req, res, next) {
  const authHeader = req.header['authorization']
  const token = authHeader
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.use(bodyParser.urlencoded({extended: false}));
router.user(bodyParser.json());
router.get('/', (req, res) => {
  res.send('test');
});

router.post('/register', (req, res) => {
  const firstname = req.body.firstname;
  const name = req.body.name;
  const email = req.body.email;
  const password = bcrypts.hashSync(req.body.password);

  db.createUser([firstname, name, email, password], (err,) => {
    if(err) {
      return res.status(500).send({"msg": "account already exists"});
    }
    db?FindUserWithEmail(email, (err, user) => {
      if (err)
          return res.status(500).send({"msg": "internal server error"});
      const expireIn = 24 * 60 * 60;
      const accessToken = jwt.sign({id: user.id}, secretKey, {
        expireIn: expireIn
      });
      res.status
    })
  });
})