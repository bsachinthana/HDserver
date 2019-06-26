var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../models/user.model');
var path = require('path') //resolve path
var mongoose = require('mongoose');
//file upload and namify
var multer = require('multer');
var namify = require('filenamify');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

var mailgun = require("mailgun-js");
var api_key = '6a1929375e01f9725f97ca3fd9e2b55a-b6183ad4-648b8df6';
var DOMAIN = 'hanthanadrive.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

const tokenSchema = new mongoose.Schema({
  user_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});
var Token = mongoose.model('Token', tokenSchema);

//Bind connection to error event (to get notification of connection errors)

var DIR = './ids/';

//gives full access
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ids')
  },
  filename: function (req, file, cb) {
    var o = file.originalname;
    let ext = o.substring(o.lastIndexOf('.'), o.length);
    console.log(req.body);
    var fileName = (namify(req.body.sno, { replacement: '_' }) + ext)
    cb(null, fileName);
  }
});

var upload = multer({ storage: storage }).single('image');

const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

function response(res, status, data, msg) {
  var response = {
    "data": data,
    "message": msg
  }
  res.status(status).json(response);
};
/* GET users listing. */
router.post('/login', function (req, res, next) {
  var un = req.body.un;
  var pw = req.body.pw;
  console.log(un);
  User.findOne({ 'sno': un }, function (err, profile) {
    if (err) return res.send(err);
    console.log(profile);
    if (!profile) {
      response(res, 400, "", 'User Doesn\'t Exist');

    }else if(profile.status!='active'){
      response(res, 400, "", 'USER_NOT_ACTIVE');
    }else if (!profile.validPassword(pw)) {
      response(res, 400, "", 'Incorrect Password');

    } else {
      // if user is found and password is right
      // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        name: profile.name,
        sno: profile.sno,
        accType: profile.accType
      };
      var token = jwt.sign(payload, config.secret, {
        expiresIn: '1d' // expires in 24 hours
      });

      // return the information including token as JSON
      response(res, 200, { profile: payload, token: token }, '');
    }
  });

});

router.post('/approve', function (req, res, next) {
  console.log('sno ' + req.body.sno + ' id ' + req.body.id);
  // check header or url parameters or post parameters for token
  var token = req.headers.authorization;

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ message: 'invalid token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.json({ status: 500, message: 'no token' });
  }

}, function (req, res) {
  var sno = req.body.sno;
  var id = req.body.id;
  User.findOne({ _id: id, sno: sno }, function (err, user) {
    if (err) {
      return res.json({ 'status': 500, 'message': 'INCORRECT_POST_DATA', 'data': err.message });
    }
    if (user) {
      var token = new Token({ user_Id: mongoose.Types.ObjectId(user._id), token: crypto.randomBytes(16).toString('hex') });

      // Save the verification token
      token.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: err.message });
        }
        //only if token function is done
        User.findOneAndUpdate({ sno: sno }, { $set: { status: 'approved' } }, function (err, status) {
          if (err) {
            return res.json({ 'status': 500, 'message': err.message });
          }
          
            var url = 'http://'+req.headers.host+'/user/confirmation/' + user._id + '/' + token.token;
            var data = {
              from: 'Hanthanadrive Team <services@hanthanadrive.com>',
              to: user.email,
              subject: "Hanthanadrive Account Confirmation",
              html: '<html><body><p> Hi '+user.name+',<br/> You have successfully registered at HanthanaDrive. Please click on the link to activate your account <a href="' + url + '">' + url + '</a></p></body></html>'
            };

            mailgun.messages().send(data, function (error, body) {
              if (err) {
                console.log(err)
                return res.json({ 'status': 500, 'message': 'error in sending mail' });
              }
              return res.json({ 'status': 200, 'message': 'successful in changing system' });

          });
          
        });

      });
    }
    //&&&&&&&&&&&&&&&&&&&&&& HANDLE ERROR &&&&&&&&&&&&&&&&&&&&&&&&&&&//
  });


});

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//confirmation
router.post('/confirmation', function (req, res, next) {
  if (req.body.id && req.body.token) {
    Token.findOne({ user_Id: mongoose.Types.ObjectId(req.body.id), token: req.body.token }).populate('user_Id').exec(function (err, token) {
      if (err) {
        return res.json({ 'status': 500, 'message': err.message });
      }
      if (token) {
        User.findOneAndUpdate({ sno: token.user_Id.sno }, { $set: { status: 'active' } }, function (err, status) {
          if (err) {
            res.json({ 'status': 500, 'message': err.message });
          }
          Token.findOneAndRemove({ user_Id: mongoose.Types.ObjectId(req.body.id), token: req.body.token }, function (err, doc) {
            if (err) {
              return res.json({ 'status': 500, 'message': err.message });
            }
            res.json({ 'status': 200, 'message': 'accout_Active' });
          })

        });

      }
    });
  }

});
//new user
router.post('/register', upload,function (req, res, next) {
    var u = {};
    u.name = req.body.name;
    u.card = req.body.card;
    u.tpno = req.body.tpno;
    u.sno = req.body.sno
    u.email = req.body.email
    u.idFileName = req.file.filename;
    var user = User(u);
    user.setPassword(req.body.password);
    console.log(user);
    user.save(function (err) {
      if (err) return sendError(err, res);
      response(res, 200, "", "SUCCESS");
    });
});

//login
router.get('/pending', function (req, res, next) {
  User.find({ 'status': 'pending' }, 'name card sno email idFileName', function (err, profile) {
    if (err) return res.json({ 'status': '404', 'message': err });
    console.log(profile);
    // return the information including token as JSON
    response(res, 200, { profile: profile }, '');
  });
});

router.get('/id', function (req, res, next) {
  var f = req.query.fn;
  var x = path.resolve('./ids/' + f)
  res.sendFile(x);
});

router.get('/validate',function (req, res, next) {
  var token = req.get('Authorization');;
  console.log(token);
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ message: 'INVALID_TOKEN' });
      } else {
        return res.json({ message: decoded.accType});
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.json({ status: 500, message: 'NO_TOKEN' });
  }
});
module.exports = router;
