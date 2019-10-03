var mongoose = require('mongoose');
var connection = require('./connection');
var bcrypt = require('bcryptjs');
var passport=require('passport');
var jwt=require('jsonwebtoken');
var _ = require('lodash');

class Student {
    constructor() {
        this.isStudentActive=false;
        this.studentSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            fullName: { type : String  , required:" is required" },
            phone: { type : String },
            email: { type : String , required:" is required", unique :true },
            imgUrlStudent: { type : String },
            facultyName: { type : String },
            password: { type : String  , required:" is required",minlength:[4,"password is less than 4 characters"]}, 
            saltSecret: { type : String },
            status :{type:Boolean}
        });
        
        
          this.studentSchema.path('email').validate(function(val){
           var emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0,9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(val);
            },'invalid e-mail');
         

        this.studentSchema.pre('save',function(next){
            let currentUser=this;
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(currentUser.password, salt, function(err, hash) {
                    currentUser.password=hash;
                    currentUser.saltSecret=salt;
                   next();
                });
            });
           })
         
        this.studentSchema.methods.verifyPassword=function(password)
        {
            return bcrypt.compareSync(password,this.password);
        }

        this.studentSchema.methods.generateJwt = function () {
            return jwt.sign({ _id: this._id},
                process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXP
            });
        }
     
          
        this.Studentmodule = mongoose.model('', this.studentSchema, 'student');
    
    }

    getAllStudents() {
        return new Promise((resolve, reject) => {
            this.Studentmodule.find((err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }



getStudentsByStatusAndPage(status,page)
    {
        var perPage = 6 , pageNum = Math.max(0, page);

        return new Promise((resolve, reject) => {
            this.Studentmodule.find({status:status},(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data getStudentsByStatusAndPage');
                } else {
                    resolve(data);
                }
            }).skip(perPage * pageNum).limit(perPage)
        })
    }


    getStudentsCountByStatus(status)
    {
        return new Promise((resolve, reject) => {
            this.Studentmodule.count({status:status},(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data getStudentsCountByStatus');
                } else {
                    resolve(data);
                }
            })
        })
    }



    addNewStudent(obj) {
        return new Promise((resolve, reject) => {

            const instance = new this.Studentmodule();
            instance._id=new mongoose.Types.ObjectId();
            instance.fullName=obj.fullName;
            instance.password=obj.password;
            instance.phone=obj.phone;
            instance.email=obj.email;
            instance.imgUrlStudent=obj.imgUrlStudent;
            instance.facultyName=obj.facultyName;
            instance.status=true;

            instance.save(function (err) {
               if(!err)
               {
                 resolve("student added successfully");
               }
               else
               {
                 if(err.code == 11000)
                     reject("error in email duplication");  
                 else

                     reject (err);
               }

               });
 


        });
    }



    getOneStudent(id) {
        return new Promise((resolve, reject) => {
            this.Studentmodule.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    getStudentIdByEmail(email)
    {
        return new Promise((resolve, reject) => {
            this.Studentmodule.findOne({email:email}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }


    deleteOneStudent(id) {
        return new Promise((resolve, reject) => {
            this.Studentmodule.deleteOne({
                _id: id
            }, (err, data) => {
                if (err) {
                    reject('Error Delete Student ..... ' + err);
                } else {
                    resolve('Student Delete Successfully ..... ');
                }
            })
        })
    }

    updateOneStudent(obj, id) {
        return new Promise((resolve, reject) => {
            this.Studentmodule.updateOne({
                _id: id
            }, {
                $set: {
                    "fullName": obj.fullName,
                    "password": obj.password,
                    "phone": obj.phone,
                    "email": obj.email,
                    "imgUrlStudent": obj.imgUrlStudent,
                    "facultyName": obj.facultyName,
                    "status":obj.status
                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    

    authenticate(req,res,next)
    {
          this.isStudentActive=true;

          passport.authenticate('local',(err,user,info)=>{
               if(err)
               {
                  return res.status(400).json(err);
               }
               else if(user.status==false)
               {
                  return res.status(200).json(err);
               }
               else if (user)
               {    console.log("user="+user);
                  return res.status(200).json({"token":user.generateJwt()});
               }
               else
               {
                  return res.status(404).json(info);  
               }
          })(req,res);
          
    }



    
    studentProfile(req,res,next)
    {     
            this.Studentmodule.findOne({ _id: req._id },
                (err, user) => {
                    if (!user)
                        return res.status(404).json({ status: false, message: 'student record not found.' });
                    else
                        return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
                }
            );
        
        
    }



     // use in admin page to block student 
     blockOneStudent(id) {
        return new Promise((resolve, reject) => {
            this.Studentmodule.updateOne({
                _id: id
            }, {
                $set: {
                    "status": "false"
                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                    console.log('error ..... ');
                } else {
                    resolve(data);
                    console.log('success ..... ');
                }
            })
        })
    }



    // use in admin page to Active student 
    activeOneStudent(id) {
        return new Promise((resolve, reject) => {
            this.Studentmodule.updateOne({
                _id: id
            }, {
                $set: {
                    "status": "true"
                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                    console.log('error ..... ');
                } else {
                    resolve(data);
                    console.log('success ..... ');
                }
            })
        })
    }



    updateOneStudentWithPassword(obj, id) {
       
        return new Promise((resolve, reject) => {
        // bcrypt.hash(obj.password, saltRounds, function (err,   hash) 
        //    { 
          obj.password = bcrypt.hashSync(obj.password, 10);     
            this.Studentmodule.updateOne({
                    _id: id
                }, {
                    $set: {
                        "fullName": obj.fullName,
                        "password": obj.password,
                        "phone": obj.phone,
                        "email": obj.email,
                        "imgUrlStudent": obj.imgUrlStudent,
                        "facultyName": obj.facultyName,
                        "status":obj.status
            
                    }
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
               // this.ownermodule.save();
      });
  // });
    }



}




module.exports = Student;