const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var productRepo = require('../repository/productRepo');
const DOMParser = require('xmldom').DOMParser;
const mongoDB = 'mongodb://bonbanh:bonbanh1@ds143893.mlab.com:43893/bonbanh';

//Set up mongoose connection
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// get data

router.get('/', (req, res) => {
    var query = unescape(req.query.q);
    var productsList = productRepo.getProductList();
    Promise.all([productsList]).then(([products]) => {
        var items = products.filter(product => product.productName.indexOf(query) !== -1);
        console.log(items)
        if (query) {
            var vm = {
                items: items,
            }
            res.render('search', vm);
        }
    else {
        // res.render('error/index');
    }
    })
})

function getHTMLListitem(id, s) {
    var html_object = '', col = 0, html_child = '';
    for (let i = 0; i < productsList.length; i++) {
      if (productsList[i].productId !== id)
      {
        var price, offer = '';
        
          if (productsList[i].count == 0) {
            offer = 'div class="offer">' + 'Limited' + '</div>';
          }
          price = productsList[i].unitPrice;
        
        html_child += '\
          <div class="col-md-3 col-sm-3">\
            <div class="products">\
              <a href="/details/' + productsList[i].productId + '">'
                + offer + '\
                <div class="thumbnail">\
                  <img src="' + s + productsList[i].productId + '_1.jpg" alt="Product Name">\
                </div>\
                <div class="productname">' + productsList[i].productName + '</div>\
                <h4 class="price">' + price.toLocaleString('vi') + ' $ </h4>\
              </a>\
            </div>\
          </div>\
        ';
  
        col++;
  
        if (col === 4) {
          html_child = '\
            <li>\
              <div class="row">' 
                + html_child + 
              '</div>\
            </li>\
          ';
  
          html_object += html_child;
          html_child = '';
          col = 0;
        }
      }
    }
  
    if (col !== 0) {
      html_child = '\
        <li>\
          <div class="row">' 
            + html_child + 
          '</div>\
        </li>\
      ';
      html_object += html_child;
    }
    
    return new DOMParser().parseFromString(html_object);
  }
  
module.exports = router;

//