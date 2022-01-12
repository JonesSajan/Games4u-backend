var express = require("express");
var router = express.Router();
var pool = require("./pool.js");
var upload = require("./multer");

/* GET home page. */
router.post("/addnewgame", upload.any(), function (req, res, next) {
  sql =
    "insert into games(categoryid,subcategoryid,gamename,description,price,picture,stock,rented,rentamt,offer, slotsavailable) values(?,?,?,?,?,?,?,?,?,?,?)";
  pool.query(
    sql,
    [
      req.body.categoryid,
      req.body.subcategoryid,
      req.body.gamename,
      req.body.description,
      req.body.price,
      req.files[0].originalname,
      req.body.stock,
      req.body.rented,
      req.body.rentamt,
      req.body.offer,
      req.body.slotsavailable
    ],
    function (error, result) {
      if (error) {

        console.log("rrrrrrrrrrrrrrrrr"+error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.get("/displayall", function (req, res) {
  pool.query("select * from games", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/searchgames", function (req, res) {

  var q="select * from games where gamename like '%"+req.body.value+"%'"
  pool.query(q,[req.body.value], function (error, result) {
    if (error) {

      res.status(400).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/searchgamesbycategory", function (req, res) {

    var q="select * from games where categoryid=?"
    pool.query(q,[req.body.value], function (error, result) {
        if (error) {

            res.status(400).json([]);
        } else {
            res.status(200).json(result);
        }
    });
});


router.post("/displaygamebysubcategoryid", function (req, res) {

  pool.query(
    "select * from games where subcategoryid=?",
    [req.body.subcategoryid],
    function (error, result) {
      if (error) {

        res.status(500).json([]);
      } else {

        res.status(200).json(result);
      }
    }
  );
});

router.get("/gameoffers", function (req, res) {
  pool.query("select * from games where offer>0", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});

router.post(
  "/editicon",
  upload.single("icon"),
  function (req, res, next) {
    pool.query(
      "update games set icon=? where gameid=?",
      [req.file.originalname, req.body.gameid],
      function (error, result) {
        if (error) {

          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  }
);

router.post("/editgame", function (req, res, next) {
  pool.query(
    "update games set categoryid=?,subcategoryid=?,gamename=?,description=?,price=?,stock=?,rented=?,rentamt=?,offer=? where gameid=?",
    [
      req.body.categoryid,
      req.body.subcategoryid,
      req.body.gamename,
      req.files[0].originalname,
      req.body.description,
      req.body.price,
      req.body.stock,
      req.body.rented,
      req.body.rentamt,
      req.body.offer,
      req.body.gameid,
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
router.post("/deletegame", function (req, res, next) {
  pool.query(
    "delete from games where gameid=?",
    [req.body.gameid],
    function (error, result) {
      if (error) {

        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});


router.get("/gamesoffers", function (req, res) {
  pool.query("select * from games where offer>0", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json(result);
    }
  });
});





module.exports = router;
