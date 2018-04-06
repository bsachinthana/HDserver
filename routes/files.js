var express = require('express');
var router = express.Router();

router.get('/:fid', function (req, res, next) {
    res.download('./uploads/' + req.params.fid, req.query.fname);
  });
  
module.exports = router;