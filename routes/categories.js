var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer');
/* GET home page. */
router.post('/addnewcategory',upload.any(), function(req, res) {
  console.log(req.body)
  pool.query("insert into categories(categoryname,description,icon,ad,adstatus)values(?,?,?,?,?)",
  [req.body.categoryname,req.body.description,req.files[0].originalname,req.files[1].originalname,req.body.adstatus],
  function(error,result){
   console.log(error);
    if(error)
   { console.log(error)
     res.status(500).json({result:false})
   }  
  else
  {
    res.status(200).json({result:true})

  }

  })
 
});

router.get('/dispalyallcategory', function(req, res, next) {
  console.log(req.body);
 pool.query("select * from categories",function(error,result){
  console.log(error);

   if (error){
     res.status(500).json([])
   }
   else{
     res.status(200).json(result)
   }

 })
});

router.post('/findname', function(req, res, next) {
  console.log(req.body);
  pool.query("select * from categories where categoryid=?",[req.body.categoryId],function(error,result){
    console.log(error);

    if (error){
      res.status(500).json([])
    }
    else{
      res.status(200).json(result)
    }

  })
});

router.post('/Updatecategory',function(req,res,next){
  pool.query("update categories set categoryname=?,description=?,status=? where categoryid=?",[
    req.body.categoryname,
    req.body.description,
    req.body.status,
    req.body.categoryid],function(error,result){
    if (error){
      console.log(error);
      res.status(500).json({'result':false})
     
    }
      else{
        res.status(200).json({'result':true})
      
    }
  })
})
router.post('/updateicon',upload.any(),function(req,res,next){ 
  pool.query('update categories set icon=? where categoryid=?',[req.files[0].originalname,req.body.categoryid],function(error,result){
    if(error){
      res.status(500).json({'result':false})
    }
    else{
      res.status(200).json({'result':true})
    }
  })
})
router.post('/updatead',upload.any(),function(req,res,next){
  console.log(req.body);
  pool.query('update categories set ad=? where categoryid=?',[req.files[0].originalname,req.body.categoryid],function(error,result){
    if(error){console.log(error);
      res.status(500).json({'result':false})
    }
    else{
      res.status(200).json({'result':true})
    }
  })
})


router.post('/deletecategory', function(req, res, next) {
  console.log(req.body);
  pool.query("delete from categories where categoryid=?",[req.body.categoryid],function(error,result){
    if (error){
      res.status(500).json([])
    }
    else{
      res.status(200).json(result)
    }
 
  })
 });
 
module.exports = router;
