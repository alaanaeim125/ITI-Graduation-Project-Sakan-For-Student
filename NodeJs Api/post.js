var mongoose = require('mongoose');
var connection = require('./connection');
var Owners = require('./user');
var owner = Owners.owner;

class Posts {
    constructor() {
        const postsSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            Date: Date,
            Governar: String,
            District: String,
            Area: Number,
            NumberOfRooms: Number,
            Price: Number,
            Street: String,
            NumberOfBeds: Number,
            Available_NumberOfBeds: Number,
            ImageUrl: String,
            Details: String,
            status:Boolean
        });
        this.postmodule = mongoose.model('post', postsSchema, 'post');
    }

    
    getAllPosts() {
        return new Promise((resolve, reject) => {
            this.postmodule.find({status:true},(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    getPostsByStatusAndPage(status,page)
    {
        var perPage = 6 , pageNum = Math.max(0, page);

        return new Promise((resolve, reject) => {
            this.postmodule.find({status:status},(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ');
                } else {
                    resolve(data);
                }
            }).skip(perPage * pageNum).limit(perPage)
        })
    }


    getPostsCountByStatus(status)
    {
        return new Promise((resolve, reject) => {
            this.postmodule.count({status:status},(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ');
                } else {
                    resolve(data);
                }
            })
        })
    }


    getAllPostsGovrnar() {
        return new Promise((resolve, reject) => {
            this.postmodule.distinct('Governar',(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }


  
    getrequestStudentAllPostByPage(Governar,District,NumberOfRooms,NumberOfBeds,MinPrice,MaxPrice
        ,MinArea,MaxArea,page) {

        var perPage = 6 , pageNum = Math.max(0, page);

        var searchObj = new Object();

        if(Governar!='null')
         searchObj["Governar"]=Governar.trim();
        
        if(District!='null')
        searchObj["District"]=District.trim();
        
        if(NumberOfRooms!=0)
        searchObj["NumberOfRooms"]=parseInt(NumberOfRooms.trim());
        
        if(NumberOfBeds!=0)
        searchObj["NumberOfBeds"]=parseInt(NumberOfBeds.trim());
   
        if(MinPrice!=0 && MaxPrice!=0)
        {
        searchObj["Price"]={ $gte:parseInt(MinPrice.trim()),$lt:parseInt(MaxPrice.trim())};
        }
        else if(MinPrice!=0)
        {
            searchObj["Price"]={ $gte:parseInt(MinPrice.trim())};
        }
        else if(MaxPrice!=0)
        {
            searchObj["Price"]={ $lte:parseInt(MaxPrice.trim())};
        }


        if(MinArea!=0 && MaxArea!=0)
        {
        searchObj["Area"]={ $gte:parseInt(MinArea.trim()),$lt:parseInt(MaxArea.trim())};
        }
        else if(MinArea!=0)
        {
            searchObj["Area"]={ $gte:parseInt(MinArea.trim())};
        }
        else if(MaxArea!=0)
        {
            searchObj["Area"]={ $lte:parseInt(MaxArea.trim())};
        }
    


        searchObj["status"]=true;

  

        return new Promise((resolve, reject) => {
            this.postmodule.find(searchObj,(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ');
                } else {
                    resolve(data);
                }
            }).skip(perPage * pageNum).limit(perPage)
        })
    }


   
       
  


    getAllPostsDistrict() {
        return new Promise((resolve, reject) => {
            this.postmodule.distinct('District',(err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }


    getAllPostsCount(Governar,District,NumberOfRooms,NumberOfBeds,MinPrice,MaxPrice,MinArea,MaxArea) {

        var searchObj = new Object();

        if(Governar!='null')
         searchObj["Governar"]=Governar.trim();
        
        if(District!='null')
        searchObj["District"]=District.trim();
        
        if(NumberOfRooms!=0)
        searchObj["NumberOfRooms"]=parseInt(NumberOfRooms.trim());
        
        if(NumberOfBeds!=0)
        searchObj["NumberOfBeds"]=parseInt(NumberOfBeds.trim());
   
        if(MinPrice!=0 && MaxPrice!=0)
        {
        searchObj["Price"]={ $gte:parseInt(MinPrice.trim()),$lt:parseInt(MaxPrice.trim())};
        }
        else if(MinPrice!=0)
        {
            searchObj["Price"]={ $gte:parseInt(MinPrice.trim())};
        }
        else if(MaxPrice!=0)
        {
            searchObj["Price"]={ $lte:parseInt(MaxPrice.trim())};
        }

        if(MinArea!=0 && MaxArea!=0)
        {
        searchObj["Area"]={ $gte:parseInt(MinArea.trim()),$lt:parseInt(MaxArea.trim())};
        }
        else if(MinArea!=0)
        {
            searchObj["Area"]={ $gte:parseInt(MinArea.trim())};
        }
        else if(MaxArea!=0)
        {
            searchObj["Area"]={ $lte:parseInt(MaxArea.trim())};
        }
    

        searchObj["status"]=true;

        return new Promise((resolve, reject) => {
            this.postmodule.count(searchObj,(err, data) => {
                if (err) {
                    reject('Error Occured In count ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }



    addNewPosts(obj) {
        return new Promise((resolve, reject) => {

            const post = {
                _id: new mongoose.Types.ObjectId(),
                Date: new Date(),
                Governar: obj.Governar,
                District: obj.District,
                Area: obj.Area,
                NumberOfRooms: obj.NumberOfRooms,
                Price: obj.Price,
                Street: obj.Street,
                NumberOfBeds: obj.NumberOfBeds,
                Available_NumberOfBeds: obj.Available_NumberOfBeds,
                ImageUrl: obj.ImageUrl,
                Details: obj.Details,
                status: true
            }

            this.postmodule.create(post, (err, data) => {
                if (err) {
                    reject('Error Insert Data ..... ');
                } else {
         
                    resolve(post._id);

                }
            });

            



        });
    }

    getOnePost(id) {
        return new Promise((resolve, reject) => {
            this.postmodule.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }



    deleteOnePosts(id) {
        return new Promise((resolve, reject) => {

            this.postmodule.deleteOne({
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

    updateOnePosts(obj, id) {
        return new Promise((resolve, reject) => {

            this.postmodule.updateOne({
                _id: id
            }, {
                $set: {
                    "owner_id": obj.owner_id,
                    "Date": obj.Date,
                    "Governar": obj.Governar,
                    "District": obj.District,
                    "Area": obj.Area,
                    "NumberOfRooms": obj.NumberOfRooms,
                    "Price": obj.Price,
                    "Street": obj.Street,
                    "NumberOfBeds": obj.NumberOfBeds,
                    "Available_NumberOfBeds": obj.Available_NumberOfBeds,
                    "ImageUrl": obj.ImageUrl,
                    "Details": obj.Details
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



    updateOnePostsBySameImage(obj, id) {
        return new Promise((resolve, reject) => {

            this.postmodule.updateOne({
                _id: id
            }, {
                $set: {
                    "owner_id": obj.owner_id,
                    "Date": obj.Date,
                    "Governar": obj.Governar,
                    "District": obj.District,
                    "Area": obj.Area,
                    "NumberOfRooms": obj.NumberOfRooms,
                    "Price": obj.Price,
                    "Street": obj.Street,
                    "NumberOfBeds": obj.NumberOfBeds,
                    "Available_NumberOfBeds": obj.Available_NumberOfBeds,
                    "ImageUrl": obj.ImageUrl,
                    "Details": obj.Details
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




        // use in admin page to block post 
        activeOnePost(id) {
            return new Promise((resolve, reject) => {
                this.postmodule.updateOne({
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
    
    
    
          // use in admin page to block post 
    blockOnePost(id) {
        return new Promise((resolve, reject) => {
            this.postmodule.updateOne({
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


    // in post class 
getPostByOwnerID(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
        this.postmodule.find({owner_id:id}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}





}

module.exports = Posts;