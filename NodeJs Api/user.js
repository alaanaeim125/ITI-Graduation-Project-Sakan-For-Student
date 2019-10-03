var Students = require('./students');
var student = new Students();

var Owners = require('./owners');
var owner = new Owners();

var Admins = require('./admins');
var admin = new Admins();


module.exports={owner,student,admin};
