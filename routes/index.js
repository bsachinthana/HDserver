var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var multer = require('multer');
var namify = require('filenamify');
var Subject = require('../models/subject.model');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

// set the directory for the uploads to the uploaded to
var DIR = './uploads/';

//gives full access
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  }
})

var upload = multer({ storage: storage }).single('file');

var thingSchema = new mongoose.Schema({
  title: String,
  desc: String,
  course:{type: mongoose.Schema.Types.ObjectId, ref:'Subject'},
  content:mongoose.Schema.Types.Mixed
});
var Thing = mongoose.model('Thing', thingSchema);

//this middle ware applies to all the functions
router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers.authorization;

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({message:'invalid token'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.json({status:500,message:'no token'});
  }
})

//moved to file.js

//our file upload function.
/*router.post('/',upload, function (req, res, next) {
       console.log(req.body);
       path = req.file.mimetype;
       return res.send("Upload Completed for "+path);
 });*/

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return res.send(err);
    }
    console.log(req.body);
    var content={};
    content.type=req.body.type;
    content.fileId = req.file.filename;
    //mongoose.Types.ObjectId(obj.course);
    content.fileType=req.file.mimetype;
    var o = req.file.originalname;
    let ext = o.substring(o.lastIndexOf('.'), o.length);
    content.fileName = (namify(req.body.title) + ext).replace(' ','_');
    console.log(content.fileName);

    
    var thing = new Thing({
      title:req.body.title,
      desc:req.body.desc,
      course: mongoose.Types.ObjectId(req.body.course),
      content:content
    });

    thing.save(function (err) {
      if (err) return send(err);
      return res.send("Upload Completed");
    });
  })
});


router.get('/',function(req,res){

  Thing.find().populate('course').select({'_id':0,'course._id':0}).exec(function(err,data){
    if (err) return res.json({error:err});
    res.json({status:200,data:data});
  });

});
module.exports = router;