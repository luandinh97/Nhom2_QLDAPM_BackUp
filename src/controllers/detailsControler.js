const express = require('express');
const router = express.Router();
const DOMParser = require('xmldom').DOMParser;
const mongoose = require('mongoose');
const mongoDB = 'mongodb://bonbanh:bonbanh1@ds143893.mlab.com:43893/bonbanh';

//Set up mongoose connection
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// get data
var productSchema = require('../models/product');
var productsList = [];
function getProductsList() {
  productSchema.find({})
  .exec(function(err, sp) {
    if (err) {
      console.log("error");
    }
    else {
      productsList = sp;
    }
  });
}
getProductsList();


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
            <a href="#">'
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


/* GET home page. */
router.get('/', function(req, res, next) {
  var href = '', state = '', action = '';
  href = '#';
  state = 'Log in';
  action = "document.getElementById('id01').style.display='block'";
  
  res.render('index', { 
    href: href,
    state: state,
    action: action,
    title_header: 'Home Page'
  });
});

/* GET home-details page*/
router.get('/home-details', function(req, res, next) {
  res.render('home-details', {title: 'Product list', 
    items: getHTMLListitem(-1, '../images/'),
    title_header: 'Products'
  });
});

module.exports = router;