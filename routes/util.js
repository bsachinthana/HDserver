var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var subject = require('../models/subject.model');

router.get('/subjects', function (req, res) {
    subject.aggregate([
      {
        $group: {
          _id: '$subject',
          courses: { $push: { code: '$code', name: '$name', id: '$_id' } }
        }
      }
    ], function (err, result) {
      if (err) return send(err);
      res.json(result);
    });
  });

  router.get('/departments', function (req, res) {
    subject.distinct("subject", function (err, result) {
      if (err) return send(err);
      res.json(result);
    });
  });
module.exports = router;