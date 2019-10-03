 
const PASSPORT=require('passport');
const LOCALSTRATEGY=require('passport-local').Strategy;

var Students=require('../user');
var student = Students.student;

var Owners = require('../user');
var owner = Owners.owner;

var Admins = require('../user');
var admin = Admins.admin;


PASSPORT.use(
    new LOCALSTRATEGY({ usernameField: 'email' },
        (username, password, done) => {

            if(student.isStudentActive && !owner.isOwnerActive && !admin.isAdminActive)
            { 
             console.log("student is active");
             student.isStudentActive=false;
            student.Studentmodule.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email student is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong student password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        
            }

             else if(owner.isOwnerActive && !student.isStudentActive && !admin.isAdminActive)
             { 
                 console.log("owner is active");
             owner.isOwnerActive=false;
                owner.ownermodule.findOne({ email: username },
                    (err, user) => {
                        if (err)
                            return done(err);
                        // unknown user
                        else if (!user)
                            return done(null, false, { message: 'Email owner is not registered' });
                        // wrong password
                        else if (!user.verifyPassword(password))
                            return done(null, false, { message: 'Wrong owner password.' });
                        // authentication succeeded
                        else
                            return done(null, user);
                    });

             }


             else if(  admin.isAdminActive && !owner.isOwnerActive && !student.isStudentActive)
             { 
                 console.log("admin is active");
                admin.isAdminActive=false;
                admin.AdminModel.findOne({ email: username },
                    (err, user) => {
                        if (err)
                            return done(err);
                        // unknown user
                        else if (!user)
                            return done(null, false, { message: 'Email admin is not registered' });
                        // wrong password
                        else if (!user.verifyPassword(password))
                            return done(null, false, { message: 'Wrong admin password.' });
                        // authentication succeeded
                        else
                            return done(null, user);
                    });

             }
             

        
            })



);
      

      
      function shareSameStudentObject(){
        return student;
      }

      function shareSameOwnerObject(){
        return owner;
      }

      function shareSameAdminObject(){
        return admin;
      }

      module.exports.shareSameStudentObject = shareSameStudentObject;

      module.exports.shareSameOwnerObject = shareSameOwnerObject;

      module.exports.shareSameAdminObject = shareSameAdminObject;
