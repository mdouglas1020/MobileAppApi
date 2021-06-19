var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var db = require('./connection');


router.post('/signup', function(req,res){
  let alias = req.body.alias;
  let email = req.body.email;
  let pass = req.body.pass;

  // check to see if already exist
  db.query('SELECT * FROM user WHERE email = ?', [email], function(err, rows){
    let count = rows.length;
    if(count == 0){
      // hash the password
      bcrypt.hash(pass, 10, function(err, hash) {
        // submit email and password has to user table
        db.query('INSERT INTO user (email, password) VALUES (?,?)', [email, hash], function(err, rows){
          // insert alias into alias table
          db.query('INSERT INTO user_alias (fk_email, alias) VALUES (?,?)', [email, alias], function(err, rows){
            res.send(err);
          });
        });
      });
    }
    // user already exists
    else {
      res.send("A user with this email has already been signed up.")
    }
  });

  console.log("signup attempt");
}); // end signup

router.post('/login', function(req, res){
  var email = req.body.email;
  var pass = req.body.pass;

  //grab hashed password from database
  db.query('SELECT password FROM user WHERE email = ?', [email], function(err, rows){
    let count = rows.length;
    if(count == 1){
      let hash = rows[0].password;
      // compare plaintext password against hashed password
      bcrypt.compare(pass, hash, function(err, result) {
        // sends true if the same false if not
        if(result){
         authenticate(email);
         res.send(result);
        } else {
         res.send(err);
        }
      });
    }
    // user doesn't exist or something else went wrong
    else {
      res.send("Could not find user account.");
    }
  });
}); // end login

router.post('/logout', function(req, res){
  db.query('UPDATE user SET active = ? WHERE email = ?', [0 ,req.body.email], function(err, rows){
    res.send('logged out');
  });
});// end logout

function authenticate(email){
  db.query('UPDATE user SET active = ? WHERE email = ?', [1, email] ,function(err, rows){
    
  });
}//end authenticate

//Returns the router as a useable variable
module.exports = router;
