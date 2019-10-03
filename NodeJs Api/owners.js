var mongoose = require('mongoose');
var connection = require('./connection');
var bcrypt = require('bcryptjs');
var passport=require('passport');
var jwt=require('jsonwebtoken');
var _ = require('lodash');

class Owner {
    constructor() {
        this.isOwnerActive=false;
         this.ownerSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            fullName: { type : String  , required:" is required" },
            phone: { type : String },
            email: { type : String , required:" is required", unique :true },
            imgUrlOwner: { type : String },
            password: { type : String  , required:" is required",minlength:[4,"password is less than 4 characters"]}, 
            saltSecret: { type : String },
            status :{type:Boolean},
            postsOfOwner:{type:Array}
        });

        this.ownerSchema.path('email').validate(function(val){
            var emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0,9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             return emailRegex.test(val);
             },'invalid e-mail');


             
        this.ownerSchema.pre('save',function(next){
            let currentUser=this;
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(currentUser.password, salt, function(err, hash) {
                    currentUser.password=hash;
                    currentUser.saltSecret=salt;
                   next();
                });
            });
           })
         
        this.ownerSchema.methods.verifyPassword=function(password)
        {
            return bcrypt.compareSync(password,this.password);
        }

        this.ownerSchema.methods.generateJwt = function () {
            return jwt.sign({ _id: this._id},
                process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXP
            });
        }
     

        this.ownermodule = mongoose.model('owner', this.ownerSchema, 'owner');
    }

    getAllOwners() {
        return new Promise((resolve, reject) => {
            this.ownermodule.find((err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    getOwnersByStatusAndPage(status,page)
    {
        var perPage = 6 , pageNum = Math.max(0, page);

        return new Promise((resolve, reject) => {
            this.ownermodule.find({status:status},(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data getStudentsByStatusAndPage');
                } else {
                    resolve(data);
                }
            }).skip(perPage * pageNum).limit(perPage)
        })
    }


    getOwnersCountByStatus(status)
    {
        return new Promise((resolve, reject) => {
            this.ownermodule.count({status:status},(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data getStudentsCountByStatus');
                } else {
                    resolve(data);
                }
            })
        })
    }



    addNewOwner(obj) {
        return new Promise((resolve, reject) => {

            const instance = new this.ownermodule();
            instance._id=new mongoose.Types.ObjectId();
            instance.fullName=obj.fullName;
            instance.password=obj.password;
            instance.phone=obj.phone;
            instance.email=obj.email;
            instance.imgUrlOwner=obj.imgUrlOwner;
            instance.status=true;
            
            instance.save(function (err) {
                if(!err)
                {
                  resolve("owner added successfully");
                }
                else
                {
                  if(err.code == 11000)
                      reject("error in owner email  duplication");  
                  else
 
                      reject (err);
                }
 
                });
 
         });
            
    }

    getOneOwner(id) {
        return new Promise((resolve, reject) => {
            this.ownermodule.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    getOwnerIdByEmail(email)
    {
        return new Promise((resolve, reject) => {
            this.ownermodule.findOne({email:email}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    deleteOneOwners(id) {
        return new Promise((resolve, reject) => {

            this.ownermodule.deleteOne({
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

    updateOneOwners(obj, id) {
        return new Promise((resolve, reject) => {

            this.ownermodule.updateOne({
                _id: id
            }, {
                $set: {
                    "fullName": obj.fullName,
                    "password": obj.password,
                    "phone": obj.phone,
                    "email": obj.email,
                    "imgUrlOwner": obj.imgUrlOwner,
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
        this.isOwnerActive=true;

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
                {
                  return res.status(200).json({"token":user.generateJwt()});
                }
                  else
                {
                  return res.status(404).json(info);
                }
                })(req,res);
          
    }



    
    ownerProfile(req,res,next)
    {     
            this.ownermodule.findOne({ _id: req._id },
                (err, user) => {
                    if (!user)
                        return res.status(404).json({ status: false, message: 'owner record not found.' });
                    else
                        return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
                }
            );
        
        
    }


      // use in admin page to block owner 
      blockOneOwner(id) {
        return new Promise((resolve, reject) => {
            this.ownermodule.updateOne({
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

    // use in admin page to active owner 
    activeOneOwner(id) {
        return new Promise((resolve, reject) => {
            this.ownermodule.updateOne({
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



    storeInOwnerPostArray(ownerId,postId)
    {
     return new Promise((resolve, reject) => {
            this.ownermodule.findByIdAndUpdate({_id:ownerId},{$push:{postsOfOwner:postId}}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })

    }


    deleteFromOwnerPostArray(ownerId,postId)
    {
     return new Promise((resolve, reject) => {
            this.ownermodule.findByIdAndUpdate({_id:ownerId},{$pull:{postsOfOwner:postId}}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })

    }


    updateOneOwnersWithPassword(obj, id) {
        var saltRounds=10;
       
         return new Promise((resolve, reject) => {
         // bcrypt.hash(obj.password, saltRounds, function (err,   hash) 
         //    { 
           obj.password = bcrypt.hashSync(obj.password, 10);     
             this.ownermodule.updateOne({
                     _id: id
                 }, {
                     $set: {
                         "fullName": obj.fullName,
                         "password": obj.password,
                         "phone": obj.phone,
                         "email": obj.email,
                         "imgUrlOwner": obj.imgUrlOwner,
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


     getOwnerByPostID(postId)
    {
        return new Promise((resolve, reject) => {
            this.ownermodule.findOne({postsOfOwner: postId}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })

    }
 



}

module.exports = Owner;