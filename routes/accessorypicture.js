var express = require('express');
var router = express.Router();
var upload= require('./multer');
var pool = require('./pool')

/* GET home page. */
router.post('/addAccesserypic',upload.any(), function(req, res, next) {
    console.log(req.body);
    pool.query("insert into accessriespicture(categoryid,subcategoryid,accessreyid,image)values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.accessreyid,req.files[0].originalname],function(err,result){
        console.log(err)
        if (err){
            console.log(err);
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    }) 
});

router.post('/displaypic',function(req,res){
    pool.query("select * from accessoriespicture where accessoryid=?", [req.body.accessoryid], function(err,result){
        if(err){
            res.status(500).json([])
        }
        else {
            res.status(200).json(result)
        }
    })
})




router.post('/updategamepic',function(req,res){
    pool.query('update accessriespicture image=? where imageid=?',[req.file.originalname,req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.post('/updategamepicdata',function(req,res){
    pool.query('update accessriespicture categoryid=?,subcategoryid=? ,accessreyid=? where imageid=?',[req.body.categoryid,req.body.subcategoryid,req.body.accessreyid,req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})


router.post('/deletegamepic',function(req,res){
    pool.query('delete from  accessriespicture where imageid=?',[req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

module.exports = router;