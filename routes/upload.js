var express = require('express');
var multer = require('multer');
var mime = require('mime');
var fs = require('fs');

var router = express.Router();


var upload_avatar = multer({
  dest: './public/upload/avatar/'
}).single('avatar');
// 解析多个相同字段的文件，文件对象都存储在req.files
var upload_photo = multer({
  dest: './public/upload/photo/'
}).array('photo', 12);
// 解析混合字段表单，文件对象会被存储在req.files中
var upload_mix = multer({
  dest: './public/upload/mix'
}).fields([{
  name: 'avatar',
  maxCount: 1
},
{
  name: 'gallery',
  maxCount: 9
}
])

// 将上传的avatar图片进行重新命名
var rename = function (req, res) {
  var file = req.file || req.files || req.files.fields
  var oldname = './public/upload/avatar/' + req.file.filename
  var newname = oldname + '.' + mime.getExtension(req.file.mimetype)
  var url = '/static/upload/avatar/' + req.file.filename + '.' + mime.getExtension(req.file.mimetype)
  fs.rename(oldname, newname, function (err) {
    if (err) throw new Error(err)
    res.send({
      url: url
    })
  })
}

// 将上传的photo进行重命名
var rename_photo = function (req, res) {
  var urls = [];
  req.files.forEach(function (file) {
    var oldname = './public/upload/photo/' + file.filename;
    var newname = oldname + '.' + mime.getExtension(file.mimetype);
    fs.renameSync(oldname, newname, function (err) {
      if (err) throw new Error(err);
    });
    var url = '/static/upload/photo/' + file.filename + '.' + mime.getExtension(file.mimetype);
    urls.push(url);
  })
  // 将重新命名好的图片以urls数组通过res响返回给客户端
  res.send({
    urls: urls
  });
}

router.post('/upload_avatar', upload_avatar, rename);
router.post('/upload_photo', upload_photo, rename_photo);
router.post('/upload_mix', upload_mix, rename);
module.exports = router;