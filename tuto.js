var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', create);

function create(){
	var kittySchema = mongoose.Schema({
	  name: String
	});
	var Kitten = mongoose.model('Kitten', kittySchema);
	var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name); // 'Silence'
	
	silence.save(function (err, silence) {
		if (err) return console.error(err);
		console.log("doc saved")
	});
}