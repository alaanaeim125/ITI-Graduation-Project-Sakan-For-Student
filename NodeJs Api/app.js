require('./config/config');
var express = require('express');
var app = express();
var cors = require('cors');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var connection = require('./connection');
var passport = require('passport');
var localStrategy=require('passport-local').Strategy;
var jwtHelper = require('./config/jwtHelper');
var _ = require('lodash');
var PASSPORTCONFIG=require('./config/passportConfig');
var student=PASSPORTCONFIG.shareSameStudentObject();
var owner=PASSPORTCONFIG.shareSameOwnerObject();
var admin=PASSPORTCONFIG.shareSameAdminObject();
var nodemailer=require('nodemailer');



//////////////////////////////////////////////////image////////////////////////////////////
const path = require('path');
const multer = require('multer');
const DIR = './uploads';
app.use(express.static('./uploads'));

//var TimeNowForImage="";
var ImageValues="";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
       // TimeNowForImage=Date.now();
       ImageValues =file.fieldname +'-'+Date.now()+'-'+file.originalname  ;
       console.log("name will pass = " + ImageValues);
        cb(null, ImageValues );
       // path.extname(file.originalname);
    }
});
let upload = multer({storage: storage});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
   
  app.get('/api', function (req, res) {
    res.end('file catcher example');
  });
   
  app.post('/api/upload',upload.single('photo'), function (req, res) {
      if (!req.file) {
          console.log("No file received");
          return res.send({
            success: false
          });
      
        } else {
          console.log('file received');
          return res.send({
            success: true
          })
        }
  });
//////////////////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
//var Students = require('./students');
//var student = new Students();

app.use((err,req,res,next)=>{
    if(err.name == 'ValidationError')
    {
        var valErrors=[];
        Object.keys(err.errors).forEach(key=>valErrors.push(err.errors[key].message));
        res.status(404).send(valErrors);
    }
});

/*------------------------------------------- Start Class Students ------------------------------*/

app.get('/getAllStudents', (req, res) => {

    student.getAllStudents().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})


app.get('/getStudentsActive', (req, res) => {

    student.getStudentsActive().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

app.get('/getStudentsNotActive', (req, res) => {

    student.getStudentsNotActive().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})


app.post("/addNewStudent", (req, res) => {
    var data=req.body;
    console.log("IMAGE NAME before = " + data.imgUrlStudent);
    data.imgUrlStudent=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.imgUrlStudent);
    
    student.addNewStudent(data)
        .then((data) => {
            ImageValues="";
            res.status(200).json(data);
           // console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            });
        })
});


app.post("/registerStudent", (req, res) => {
    var data=req.body;
    data.imgUrlStudent=ImageValues;
    ImageValues="";
    student.addNewStudent(data)
        .then((data) => {
            res.status(200).json(data);
           // console.log(data);
        })
        .catch((err) => {
            res.status(404).json({error: err});
        })
        
});


app.get('/getStudentIdByEmail/:email', (req, res) => {

    student.getStudentIdByEmail(req.params.email).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})



app.post("/authenticateStudent", (req, res) => {
    student.isStudentActive=true;
    student.authenticate(req,res);
});

app.get("/studentProfile",jwtHelper.verifyJwtToken,(req, res) => {
    student.studentProfile(req,res);    
});

app.get('/getStudentsCountByStatus/:status', (req, res) => {

    student.getStudentsCountByStatus(req.params.status).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

app.get('/getStudentsByStatusAndPage/:status/:page', (req, res) => {

    student.getStudentsByStatusAndPage(req.params.status,req.params.page).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

app.get("/getOneStudent/:studentId", (req, res) => {
    const id = req.params.studentId;
    console.log(id);
    student.getOneStudent(id)
        .then((data) => {
            res.status(200).json(data);
         //   console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
        //    console.log("err");
        })
});

app.delete("/deleteOneStudent/:userId", (req, res, next) => {
    student.deleteOneStudent(req.params.userId).then((data) => {
      //  console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
      //  console.log(err);
        res.status(404).json({
            error: err
        });
    })
});


app.put("/updateOneStudentwithImage/:studentId", (req, res) => {

    var data=req.body;
    console.log("IMAGE NAME before = " + data.imgUrlStudent);
    data.imgUrlStudent=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.imgUrlStudent);
    ImageValues="";

    student.updateOneStudent(req.body, req.params.studentId)
        .then((data) => {
            console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});


app.put("/updateOneStudent/:studentId", (req, res) => {
    student.updateOneStudent(req.body, req.params.studentId)
        .then((data) => {
            console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});



// use in block user in admin page
app.get("/blockOneStd/:id", (req, res) => {
    console.log(req.params.id);
    student.blockOneStudent(req.params.id)
        .then((data) => {
            console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});

// use in active user in admin page
app.get("/activeOneStd/:id", (req, res) => {
  //  console.log(req.params.id);
    student.activeOneStudent(req.params.id)
        .then((data) => {
            console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});



app.put("/updateOneStudentWithPasswordWithImage/:studentId", (req, res) => {
    var data=req.body;
    console.log("IMAGE NAME before = " + data.imgUrlStudent);
    data.imgUrlStudent=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.imgUrlStudent);
    ImageValues="";
    student.updateOneStudentWithPassword(data , req.params.studentId)
        .then((data) => {
            console.log('Success Update edit student ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update edit student..... ');
            res.status(404).json({
                error: err
            });
        })
});


app.put("/updateOneStudentWithPassword/:studentId", (req, res) => {
    var data=req.body;
    student.updateOneStudentWithPassword(data , req.params.studentId)
        .then((data) => {
            console.log('Success Update edit student ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update edit student..... ');
            res.status(404).json({
                error: err
            });
        })
});






/*------------------------------------------- End Class Students ------------------------------*/

/*------------------------------------------- Start Class Owner ------------------------------*/
//var Owner = require('./owners');
//var owner = new Owner();

app.get('/getAllOwners', (req, res) => {
    owner.getAllOwners().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})


app.post("/registerOwner", (req, res) => {
    owner.addNewOwner(req.body)
        .then((data) => {
            res.status(200).json(data);
         //   console.log(data);
        })
        .catch((err) => {
            res.status(404).json({error: err});
        })
        
});

app.post("/authenticateOwner", (req, res) => {
    owner.isOwnerActive=true;
    owner.authenticate(req,res);
});

app.get("/ownerProfile",jwtHelper.verifyJwtToken,(req, res) => {
    owner.ownerProfile(req,res);    
});


app.get('/getOwnersCountByStatus/:status', (req, res) => {

    owner.getOwnersCountByStatus(req.params.status).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

mongoose.set('useFindAndModify', false);

app.get('/storePostIdInOwnerArray/:ownerId/:postId', (req, res) => {

    owner.storeInOwnerPostArray(req.params.ownerId,req.params.postId).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})


app.get('/deletePostFromOwnerPostArray/:ownerId/:postId', (req, res) => {

    owner.deleteFromOwnerPostArray(req.params.ownerId,req.params.postId).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})


app.get('/getOwnersByStatusAndPage/:status/:page', (req, res) => {

    owner.getOwnersByStatusAndPage(req.params.status,req.params.page).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})



app.post("/addNewOwner", (req, res) => {
    var data=req.body;
    console.log("IMAGE NAME before = " + data.imgUrlOwner);
    data.imgUrlOwner=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.imgUrlOwner);
   
    owner.addNewOwner(data)
        .then((data) => {
            ImageValues="";
            res.status(200).json(data);
          //  console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            });
        })
});

app.get("/getOneOwner/:ownersId", (req, res) => {
    const id = req.params.ownersId;
    //console.log(id);
    owner.getOneOwner(id)
        .then((data) => {
            res.status(200).json(data);
           // console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
           // console.log("err");
        })
});

app.delete("/deleteOneOwners/:ownerId", (req, res, next) => {
    owner.deleteOneOwners(req.params.ownerId).then((data) => {
        //console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
       // console.log(err);
        res.status(404).json({
            error: err
        });
    })
});

app.put("/updateOneOwners/:ownerId", (req, res) => {
    owner.updateOneOwners(req.body, req.params.ownerId)
        .then((data) => {
            console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});


app.put("/updateOneOwnersWithImage/:ownerId", (req, res) => {
    var data=req.body;
    console.log("IMAGE NAME before = " + data.imgUrlOwner);
    data.imgUrlOwner=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.imgUrlOwner);
    ImageValues="";
    owner.updateOneOwners(req.body, req.params.ownerId)
        .then((data) => {
            console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});


// use in block owner in admin page
app.get("/blockOneOwn/:id", (req, res) => {
    //console.log(req.params.id);
    owner.blockOneOwner(req.params.id)
        .then((data) => {
            // console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
          //  console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});


// use in active owner in admin page
app.get("/activeOneOwner/:id", (req, res) => {
   // console.log(req.params.id);
    owner.activeOneOwner(req.params.id)
        .then((data) => {
       //     console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
        //    console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});



app.get('/getOwnerIdByEmail/:email', (req, res) => {

    owner.getOwnerIdByEmail(req.params.email).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})





app.put("/updateOneOwnersWithPassword/:ownerId", (req, res) => {
    var data=req.body;
    owner.updateOneOwnersWithPassword(data, req.params.ownerId)
        .then((data) => {
        //    console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
          //  console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});



app.put("/updateOneOwnersWithPasswordWithImage/:ownerId", (req, res) => {
    var data=req.body;
    console.log("IMAGE NAME before = " + data.imgUrlOwner);
    data.imgUrlOwner=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.imgUrlOwner);
    ImageValues="";
    console.log("Owner");
    console.log(data);
    owner.updateOneOwnersWithPassword(data, req.params.ownerId)
        .then((data) => {
        //    console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
          //  console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});



/*------------------------------------------- End Class Owner ------------------------------*/

/*------------------------------------------- Start Class Post ------------------------------*/
var Posts = require('./post');
var post = new Posts();

app.get('/getAllPosts', (req, res) => {

    post.getAllPosts().then((data) => {
        //res.status(200).json(data);
        //console.log("Data="+data);
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})


app.get('/getPostsCountByStatus/:status', (req, res) => {

    post.getPostsCountByStatus(req.params.status).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

app.get('/getPostsByStatusAndPage/:status/:page', (req, res) => {

    post.getPostsByStatusAndPage(req.params.status,req.params.page).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

app.get('/getAllPostsGovernar', (req, res) => {

    post.getAllPostsGovrnar().then((data) => {
        //res.status(200).json(data);
        //console.log("Data="+data);
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})



app.get('/getAllPostsDistrict', (req, res) => {

    post.getAllPostsDistrict().then((data) => {
        //res.status(200).json(data);
       // console.log("Data="+data);
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})


app.post("/addNewPosts", (req, res) => {
    var data=req.body;
    console.log("IMAGE NAME before = " + data.ImageUrl);
    data.ImageUrl=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.ImageUrl);
    ImageValues="";
    post.addNewPosts(data)
        .then((data) => {
           
            res.status(200).json(data);
           // console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            });
        })
});





app.get("/requestStudentPostByPage/:page/:Governar/:District/:NumberOfRooms/:NumberOfBeds/:MinPrice/:MaxPrice/:MinArea/:MaxArea"
, (req, res) => {
 
     post.getrequestStudentAllPostByPage(
         req.params.Governar,req.params.District,req.params.NumberOfRooms, req.params.NumberOfBeds
         ,req.params.MinPrice,req.params.MaxPrice,req.params.MinArea,req.params.MaxArea,req.params.page)
         .then((data) => {
             //console.log("data="+data);
             res.status(200).json(data);
         })
         .catch((err) => {
             res.status(404).json({
                 error: err
             });
         })
 });
 

 app.get("/getPostsCount/:Governar/:District/:NumberOfRooms/:NumberOfBeds/:MinPrice/:MaxPrice/:MinArea/:MaxArea", (req, res) => {
    post.getAllPostsCount(req.params.Governar,req.params.District,req.params.NumberOfRooms,
        req.params.NumberOfBeds,req.params.MinPrice,req.params.MaxPrice,req.params.MinArea,req.params.MaxArea)
        .then((data) => {
            res.status(200).json(data);
            //console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
          //  console.log("err");
        })
});



app.get("/getOnePost/:postId", (req, res) => {
    const id = req.params.postId;
   // console.log(id);
    post.getOnePost(id)
        .then((data) => {
            res.status(200).json(data);
           // console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
          //  console.log("err");
        })
});

app.delete("/deleteOnePosts/:postId", (req, res, next) => {
    post.deleteOnePosts(req.params.postId).then((data) => {
     //   console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
      //  console.log(err);
        res.status(404).json({
            error: err
        });
    })
});

app.put("/updateOnePosts/:postId", (req, res) => {
    var data=req.body;

    console.log("IMAGE NAME before = " + data.ImageUrl);
    data.ImageUrl=ImageValues;
    console.log("IMAGE NRW NAME after = " + data.ImageUrl);
    
    post.updateOnePosts(data, req.params.postId)
        .then((data) => {
            ImageValues="";
           // console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
           // console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});


app.put("/updateOnePostsBySameImage/:postId", (req, res) => {
    var data=req.body;
    post.updateOnePostsBySameImage(data, req.params.postId)
        .then((data) => {
           // console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
           // console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});



// use in block post in admin page
app.get("/blockOnePost/:id", (req, res) => {
    console.log(req.params.id);
    post.blockOnePost(req.params.id)
        .then((data) => {
          //  console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
          //  console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});

// use in active post in admin page
app.get("/activeOnePost/:id", (req, res) => {
    console.log(req.params.id);
    post.activeOnePost(req.params.id)
        .then((data) => {
          //  console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
           // console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});


// in app.js
app.get("/getPostByOwnerID/:ownerId", (req, res) => {
    const owner_id = req.params.ownerId;
    console.log(owner_id);
    post.getPostByOwnerID(owner_id)
        .then((data) => {
            res.status(200).json(data);
           // console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
           // console.log("err");
        })
});


app.get("/getOwnerByPostID/:postID", (req, res) => {
    const postId = req.params.postID;
    console.log(postId);
    owner.getOwnerByPostID(postId)
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
            console.log("err");
        })
});


/*------------------------------------------- End Class post ------------------------------*/

/*------------------------------------------- Start Class Order ------------------------------*/
var Orders = require('./order');
var order = new Orders();

app.get('/getAllOrders', (req, res) => {
    order.getAllOrders().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

app.post("/addNewOrders", (req, res) => {
    order.addNewOrders(req.body)
        .then((data) => {
            res.status(200).json(data);
           // console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            });
        })
});

app.get("/getOneOrders/:orderId", (req, res) => {
    order.getOneOrders(req.params.orderId)
        .then((data) => {
            res.status(200).json(data);
          //  console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
           // console.log("err");
        })
});

app.delete("/deleteOneOrders/:ordertId", (req, res, next) => {

    order.deleteOneOrders(req.params.ordertId).then((data) => {
      //  console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
      //  console.log(err);
        res.status(404).json({
            error: err
        });
    })
});

app.put("/updateOneOrders/:ordertId", (req, res) => {
    order.updateOneOrders(req.body, req.params.ordertId)
        .then((data) => {
          //  console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
          //  console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});
/*------------------------------------------- End Class Order ------------------------------*/

/*------------------------------------------- Start Class Follow ------------------------------*/
var Followers = require('./follow');
var followers = new Followers();

app.get('/getAllFollowers', (req, res) => {
    followers.getAllFollowers().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})

app.post("/addNewFollowers", (req, res) => {
    followers.addNewFollowers(req.body)
        .then((data) => {
            res.status(200).json(data);
          //  console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            });
        })
});

app.get("/getOneFollowers/:orderId", (req, res) => {
    followers.getOneFollowers(req.params.orderId)
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
            console.log("err");
        })
});

app.delete("/deleteOneFollowers/:followId", (req, res, next) => {
    followers.deleteOneFollowers(req.params.followId).then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(404).json({
            error: err
        });
    })
});

app.put("/updateOneFollowers/:followId", (req, res) => {
    followers.updateOneFollowers(req.body, req.params.followId)
        .then((data) => {
            console.log('Success Update ...... ');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log('Error Update ..... ');
            res.status(404).json({
                error: err
            });
        })
});
/*------------------------------------------- End Class Order ------------------------------*/
//////////////////////////////////////////admin////////////////////////////

app.post("/addNewAdmin", (req, res) => {
    var data=req.body;
    admin.addNewAdmin(data)
        .then((data) => {
            res.status(200).json(data);
         //   console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            });
        })
});



app.get('/getAdminIdByEmail/:email', (req, res) => {

    admin.getAdminIdByEmail(req.params.email).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    })
})



app.post("/authenticateAdmin", (req, res) => {
    admin.isAdminActive=true;
    admin.authenticate(req,res);
});

app.get("/adminProfile",jwtHelper.verifyJwtToken,(req, res) => {
    admin.adminProfile(req,res);    
});



app.post("/sendEmailToAdmin" , (req, res) => {
    
    admin.sendEmailToAdmin(req.body)
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            });
            console.log(err);
        })
});





/////////////////////////////////////////////////////////////////////////////////

app.listen(5000, () => console.log('server listening on port 5000'));

