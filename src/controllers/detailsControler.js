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

/* Get details page. */
router.get('/details/:productId', function(req, res, next) {
  var href = '', state = '', href_reg = '', state_reg ='';
  
    href = '/account/login';
    state = 'Log in';
    href_reg = "/account/register";
    state_reg = "Register";
  
  var product = productsList.filter(product => product.productId == req.params.productId);
  if (product != null) {
    var other = '', price = product[0].unitPrice;
      if (product[0].count == 0) {
        other = 'Limited';
      }
    
    res.render('details', {
      title: product[0].productName,
      href: href,
      state: state,
      href_reg:href_reg,
      state_reg:state_reg,
      main_offer: other,
      main_src: '../images/' + product[0].productId, 
      main_name: product[0].productName,
      main_describe: product[0].describe,
      main_new_price: price.toLocaleString("vi"),
      main_xuatxu: product[0].configuration.xuatxu,
      main_mau: product[0].configuration.maungoaithat,
      main_cua: product[0].configuration.socua,
      main_chongoi: product[0].configuration.sochongoi,
      main_dongco: product[0].configuration.dongco,
      main_km: product[0].configuration.sokmdadi,
      main_tt:product[0].configuration.thongtinlienhe,
      main_sdt: product[0].configuration.sdt,
      main_email: product[0].configuration.email,
      items: getHTMLListitem(product[0].productId, '../images/'),
      title_header: 'Products Details',
      
    });
  }
  else {
    res.render('error', {});
  }
});


/* GET home-details page*/
router.get('/home-details', function(req, res, next) {
  var href = '', state = '', href_reg = '', state_reg ='';
  
    href = '/account/login';
    state = 'Log in';
    href_reg = "/account/register";
    state_reg = "Register";

  res.render('home-details', {title: 'Product list', 
    href: href,
    state: state,
    href_reg:href_reg,
    state_reg: state_reg,
    items: getHTMLListitem(-1, '../images/'),
    title_header: 'Products'
  });
});


module.exports = router;