var express = require('express');
var router = express.Router();
var upload= require('./multer');
var pool = require('./pool')

/* GET home page. */
router.post('/addgamepic',upload.any(), function(req, res, next) {

    pool.query("insert into gamepicture(categoryid,subcategoryid,gameid,picture)values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.gameid,req.files[0].originalname],function(err,result){
        if (err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    }) 
});

router.post('/displaypic',function(req,res){
    pool.query("select * from gamepicture where gameid=?", [req.body.gameid],function(err,result){
        if(err){
            res.status(500).json([])
        }
        else {
            res.status(200).json(result)
        }
    })
})




router.post('/updategamepic',function(req,res){
    pool.query('update gamepicture image=? where imageid=?',[req.file.originalname,req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.post('/updategamepicdata',function(req,res){
    console.log(error);
    pool.query('update gamepicture categoryid=?,subcategoryid=? ,gameid=? where imageid=?',[req.body.categoryid,req.body.subcategoryid,req.body.gameid,req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})


router.post('/deletegamepic',function(req,res){
    pool.query('delete from  gamepicture where imageid=?',[req.body.imageid],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

module.exports = router;