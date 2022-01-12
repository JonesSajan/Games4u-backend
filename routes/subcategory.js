var express = require("express");
var router = express.Router();
var pool = require("./pool.js");
var upload = require("./multer");

/* GET home page. */
router.post("/addnewsubcategory", upload.any(), function (req, res, next) {
  sql =
    "insert into subcategory(categoryid,subcategoryname,description,price,picture,ad,adstatus,stock,rented,rentamt,offer) values(?,?,?,?,?,?,?,?,?,?,?)";
  pool.query(
    sql,
    [
      req.body.categoryid,
      req.body.subcategoryname,
      req.body.description,
      req.body.price,
      req.files[0].originalname,
      req.files[1].originalname,
      req.body.adstatus,
      req.body.stock,
      req.body.rented,
      req.body.rentamt,
      req.body.offer,
    ],
    function (error, result) {
      if (error) {


        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/displaysubcategorybycategoryid", function (req, res) {

  pool.query(
    "select * from subcategory where categoryid=?",
    [req.body.categoryid],
    function (error, result) {
      if (error) {

        res.status(500).json([]);
      } else {

        res.status(200).json(result);
      }
    }
  );
});

router.post("/searchconsole", function (req, res) {

    pool.query("select * from subcategory where subcategoryname=?",[req.body.value], function (error, result) {
        if (error) {

            res.status(400).json([]);
        } else {
            res.status(200).json(result);
        }
    });
});


router.post("/searchconsoles", function (req, res) {

  var q="select * from subcategory where categoryid=?"
  pool.query(q,[req.body.value], function (error, result) {
    if (error) {

      res.status(400).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/subcategoryoffers", function (req, res) {
  pool.query("select * from subcategory where offer>0", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});



router.get("/displayall", function (req, res) {
  pool.query("select * from subcategory", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});



router.get("/subcategoryoffer", function (req, res) {
  pool.query("select * from subcategory where offer>0", function (error, result) {
    if (error) {
      res.status(500).json([]);

    } else {
      res.status(200).json(result);
    }
  });
});
router.post("/editicon", upload.single("picture"), function (req, res, next) {
  pool.query(
    "update subcategory set picture=? where subcategoryid=?",
    [req.file.originalname, req.body.subcategoryid],
    function (error, result) {
      if (error) {

        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/editad", upload.single("ad"), function (req, res, next) {
  pool.query(
    "update subcategory set ad=? where subcategoryid=?",
    [req.file.originalname, req.body.subcategoryid],
    function (error, result) {
      if (error) {

        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/editsubcategorydata", function (req, res, next) {
  pool.query(
    "update subcategory set categoryid=?,subcategoryname=?,description=?,adstatus=?,price=?,stock=?,rented=?,rentamt=?,offer=? where subcategoryid=?",
    [
      req.body.categoryid,
      req.body.subcategoryname,
      req.body.description,
      req.body.adstatus,
      req.body.price,
      req.body.stock,
      req.body.rented,
      req.body.rentamt,
      req.body.offer,
      req.body.subcategoryid,
    ],
    function (error, result) {
      if (error) {

        res.status(500).json({ result: false });
      } else {

        res.status(200).json({ result: true });
      }
    }
  );
});
router.post("/deletesubcategory", function (req, res, next) {
  pool.query(
    "delete from subcategory where subcategoryid=?",
    [req.body.subcategoryid],
    function (error, result) {
      if (error) {

        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});
module.exports = router;
