var router = require('express').Router();
var USERCLASS = require('../mongodb/mongo_connect');

module.exports = router;

router.get('/', home_page);
router.get('/api/index', get_all_data); //get all records
router.get('/api/index/:id', get_single_data); // get one record, not implemented yet!
router.post('/api/index', post_single_data); // post new record
router.put('/api/index', put_data); // change single record
router.delete('/api/index/:_id', delete_data); // delete single record

function home_page(req, res) {
  res.render('index');
}

function get_all_data(req, res) {
  USERCLASS.find()
    .then(function (result) {
      console.log(result);
      res.json(result);
    });
}

function get_single_data(req, res) {
  // not implemented yet...
}

function post_single_data(req, res) {
  console.log('posting backend');
  console.log(req.body);
  var newUser = new USERCLASS(req.body);
  newUser.save()
    .then(function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('saved!');
    })
  res.send('backend has created user.');
}

function put_data(req, res) {
  console.log('updating...');
  console.log(req.body);
  USERCLASS.findByIdAndUpdate(req.body._id, {$set: {user: req.body.user}},function (err, data) {
    if(err) return err;
    console.log('updated!');
    res.send('backend has updated user.');
  })
}

function delete_data(req, res) {
  console.log('deleting...');
  console.log(req.params);
  USERCLASS.findByIdAndRemove(req.params._id, function (err, data) {
    if(err) return err;
    console.log('deleted!'); 
    res.send('backend has deleted user.');   
  })
}