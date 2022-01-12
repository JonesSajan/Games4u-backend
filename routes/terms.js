var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer');

/* GET home page. */
router.post('/addcondition',upload.single("icon"),function(req,res){
    console.log();

  pool.query("insert into terms (conditiongg) values(?)",[req.body.condition],function(err,result){
      if(err){
        console.log(err);

          res.status(500).json({result:false})
      }
      else{
          res.status(200).json({result:true})
      }
  })
})

router.get('/displayall',function(req,res){
  pool.query("select * from terms",function(err,result){
      if(err){
          res.status(500).json([])
      }
      else{
          res.status(200).json(result)
          
      }
  })
})

router.post('/updatecondition',function(req,res){
  pool.query("update terms set conditiongg=? where id=?",[req.body.condition,req.body.id],function(err,result){
      if(err){
          res.status(500).json({result:false})
      }
      else{
          res.status(200).json({result:true})
      }
  })
})

router.post('/deletecondition',function(req,res){
  console.log(req.body)

  pool.query("delete from terms where id=?",[res.body.id],function(err,result){
      if(err){
          res.status(500).json({result:false})
      }
      else{
          res.status(200).json({result:true})
      }
  })
})


module.exports = router;
