var express = require('express');
var router = express.Router();
var db = require('./connection');

router.post( '/products', function( req, res ) {
  checkAuthenticated(req.body.email, res);
});

function checkAuthenticated(email, res){
  var x = 0;
  db.query('SELECT active FROM user WHERE email = ?', [email], function(err, rows){
      let active = rows[0].active;
      if(active == 1){
        getProducts(res);
      } else {
        res.send("not logged in");
      }
  });
}

function getProducts(res){
  let SQL = `
      SELECT product.product, product.description, product_price.price,
             product_stock.stock, product_picture.path_to_picture,
             0 as count
      FROM   product
      JOIN   product_price ON (product.product = product_price.fk_product)
      JOIN   product_stock ON (product.product = product_stock.fk_product)
      JOIN   product_picture ON (product.product = product_picture.fk_product)
  `;

  db.query( SQL, function( err, rows ) {
      let row_count = rows.length;

      if( row_count > 0 ) {
          res.send( rows );
      }
      else {
          res.send( "Couldnt load product info" );
      }
  });
}//end getProducts

//Returns the router as a useable variable
module.exports = router;
