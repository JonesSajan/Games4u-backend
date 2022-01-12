var express = require('express');
var router = express.Router();
var upload= require('./multer');
var pool = require('./pool')

/* GET home page. */
router.post('/addconsolepic',upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var q="insert into consolepicture (categoryid,subcategoryid,picture ) values ?"
    pool.query(q,[req.files.map((item)=>

    [
        req.body.categoryid,
        req.body.subcategoryid,
        item.originalname
    ]),],
        
        function(err,result){
   
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
    pool.query("select * from consolepicture where subcategoryid=?",[req.body.subcategoryid],function(err,result){
        if(err){
            res.status(500).json([])
        }
        else {
            res.status(200).json(result)
        }
    })
})


  

router.post('/updatepic',function(req,res){
    pool.query('update consolepicture image=? where imageid=?',[req.file.originalname,req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.post('/updatepicdata',function(req,res){
    pool.query('update consolepicture categoryid=?,subcategoryid=? where imageid=?',[req.body.categoryid,req.body.subcategoryid,req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})


router.post('/deletepic',function(req,res){
    pool.query('delete from  consolepicture where imageid=?',[req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

module.exports = router;