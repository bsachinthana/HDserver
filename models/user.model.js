// grab the things we need
var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  sno: {type:String, unique:true, trim:true, lowercase:true},
  card: String,
  email: String,
  tpno: Number,
  password: String,
  salt:String,
  createdAt: Date,
  status: String,
  idFileName:String,
  accType:{type:String, default:"user"},
  uploads:[mongoose.Schema.Types.ObjectId],
  courses:[String]
});

userSchema.pre('save',function(){
  this.createdAt = new Date();
  this.status='pending';
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 250, 64, 'sha512').toString('hex');
  console.log(this.salt+", "+this.password);
}

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 250, 64, 'sha512').toString('hex');
  console.log(this.password === hash);
  return this.password === hash;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
