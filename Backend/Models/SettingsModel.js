var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Settings = Schema([{
	theme: { type: Boolean },
}]);

module.exports = mongoose.model('Settings', Settings);