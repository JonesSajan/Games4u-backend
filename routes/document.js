var express = require('express');
var router = express.Router();
var pool= require('./pool')
const upload = require('./multer');

/* GET home page. */
router.post('/adddocument',upload.single('icon'), function(req, res, next) {
  pool.query('insert into documents (documentgg) value(?) ',[req.body.document],function(err,result){
      if (err){
          res.status(500).json({result:false})
      }
      else{
          res.status(200).json({result:true})
      }
  });
});

router.post('/displayall',function(req,res){
    pool.query('select * from documents',function(err,result){
        if(err){
            res.status(500).json([])
        }
        else{
            res.status(200).json(result) 
        }
    })

})

router.post('/updatedocument',function(req,res){
    pool.query('update documents from documentgg =? where id=?',[req.body.documents,req.body.id],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.post('/deletedocument',function(req,res){
    pool.query('delete from documents where id=?',[req.body.id],function(err,result){
        if(err){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})


module.exports = router;