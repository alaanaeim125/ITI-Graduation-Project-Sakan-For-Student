var mongoose = require('mongoose');
var connection = require('./connection');
var bcrypt = require('bcryptjs');
var passport=require('passport');
var jwt=require('jsonwebtoken');
var _ = require('lodash');
var nodemailer=require('nodemailer');

class Admin {
    constructor() {
        
        this.isAdminActive=false;
        this.AdminSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            fullName: { type : String  , required:" is required" },
            phone: { type : String },
            email: { type : String , required:" is required", unique :true },
            imgUrlAdmin: { type : String },
            password: { type : String  , required:" is required",minlength:[4,"password is less than 4 characters"]}, 
            saltSecret: { type : String },
        });

        this.AdminSchema.path('email').validate(function(val){
            var emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0,9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             return emailRegex.test(val);
             },'invalid e-mail');
          

             this.AdminSchema.pre('save',function(next){
                let currentUser=this;
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(currentUser.password, salt, function(err, hash) {
                        currentUser.password=hash;
                        currentUser.saltSecret=salt;
                       next();
                    });
                });
               })
             
            this.AdminSchema.methods.verifyPassword=function(password)
            {
                return bcrypt.compareSync(password,this.password);
            }


            this.AdminSchema.methods.generateJwt = function () {
                return jwt.sign({ _id: this._id},
                    process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXP
                });
            }
         
              
            this.AdminModel = mongoose.model('admin', this.AdminSchema, 'admin');
    
    }


    getAllAdmins() {
        return new Promise((resolve, reject) => {
            this.AdminModel.find((err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }



    
    addNewAdmin(obj) {
        return new Promise((resolve, reject) => {

            const instance = new this.AdminModel();
            instance._id=new mongoose.Types.ObjectId();
            instance.fullName=obj.fullName;
            instance.password=obj.password;
            instance.phone=obj.phone;
            instance.email=obj.email;
            instance.imgUrlAdmin=obj.imgUrlAdmin;


            instance.save(function (err) {
               if(!err)
               {
                 resolve("admin added successfully");
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



    getOneAdmin(id) {
        return new Promise((resolve, reject) => {
            this.AdminModel.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    getAdminIdByEmail(email)
    {
        return new Promise((resolve, reject) => {
            this.AdminModel.findOne({email:email}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }


    deleteOneAdmin(id) {
        return new Promise((resolve, reject) => {
            this.AdminModel.deleteOne({
                _id: id
            }, (err, data) => {
                if (err) {
                    reject('Error Delete admin ..... ' + err);
                } else {
                    resolve('admin Delete Successfully ..... ');
                }
            })
        })
    }


    updateOneAdmin(obj, id) {
        return new Promise((resolve, reject) => {
            this.AdminModel.updateOne({
                _id: id
            }, {
                $set: {
                    "fullName": obj.fullName,
                    "password": obj.password,
                    "phone": obj.phone,
                    "email": obj.email,
                    "imgUrlAdmin": obj.imgUrlAdmin,

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
          this.isAdminActive=true;

          passport.authenticate('local',(err,user,info)=>{
               if(err)
                  return res.status(400).json(err);
               else if (user)
                  return res.status(200).json({"token":user.generateJwt()});
               else
                  return res.status(404).json(info);
          })(req,res);
          
    }



    
    adminProfile(req,res,next)
    {     
            this.AdminModel.findOne({ _id: req._id },
                (err, user) => {
                    if (!user)
                        return res.status(404).json({ status: false, message: 'admin record not found.' });
                    else
                        return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
                }
            );
        
        
    }


   async sendEmailToAdmin(data)
    {
        let userEmail={
            fullName:data.fullName,
            email:data.email,
            password:data.password,
            subject:data.subject,
            body:data.body
            
          };
    

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user:userEmail.email,
                pass:userEmail.password
               }
            });
    
            let mailOptions={
                from:userEmail.email,
                to:'gemy.omda880@gmail.com',
                subject:userEmail.subject,
                html:userEmail.body,
                text:'this is a text'
            }
    
        //    console.log("mailOptions="+mailOptions);

     return new Promise((resolve, reject) => {
        transporter.sendMail(
            mailOptions
        , (err, data) => {
            if (err) {
                reject('Error in sending email to admin ..... ' + err);
            } else {
                resolve('send email to admin Successfully ..... ');
            }
        })
    })
}

}


module.exports=Admin;