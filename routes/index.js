var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var multer = require('multer');
var namify = require('filenamify');
var Subject = require('../models/subject.model');
var Thing = require('../models/document.model');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

// set the directory for the uploads to the uploaded to
var DIR = './uploads/';

//gives full access

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
});

var upload = multer({ storage: storage }).single('file');

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

router.post('/', function (req, res,next) {
  upload(req, res, function (err) {
    if (err) {
      return res.json({status:500,message:"upload_error"});
    }
    next();
  })
  },
  function(req,res){
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
      if (err){
        return res.json({status:500,message:"error_saving_to_db",data:err.message});
      } 
      return res.json({status:200,message:"upload COmpleted"});
    });
  });


router.get('/',function(req,res){
  Thing.find().populate('course').select({'_id':0,'course._id':0}).sort({'date':-1}).exec(function(err,data){
    if (err) return res.json({error:err});
    res.json({status:200,data:data});
 });
});
router.get('/:subject',function(req,res){
  console.log(req.params.subject);
  Thing.aggregate([ 
    { 
      $lookup: 
      { 
        from: "subjects", 
        localField: "course", 
        foreignField: "_id", 
        as: "course" 
      }
    },{
    	$unwind: "$course"
    },
      { $match : 
        { 
          "course.subject" : req.params.subject
        } 
      },{
        $project:{
          _id:0,
          course:{_id:0,}
        }
      },{
      	$sort:{date:-1}
      }
    ]).exec(function(err,data){
    if (err) return res.json({error:err});
    res.json({status:200,data:data});
 });
});


module.exports = router;