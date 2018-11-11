var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = new Schema({
	title: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: String, required: true},
    province: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    describe: {type: String, required: true},
    user: {type: String, required: true}
});

postSchema.virtual('price_str').get(function(){
	switch(this.price) {
		case 1: return "Dưới 200 Triệu";
		case 2: return "200-400 Triệu";
		case 3: return "400-600 Triệu";
		case 4: return "600-800 Triệu";
		case 5: return "800-1 Tỉ";
		case 6: return "Trên 1 Tỉ"
	}
});
module.exports = mongoose.model('post', postSchema);