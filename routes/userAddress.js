const express = require("express");
const router = express.Router();
const pool = require("./pool.js");
/* GET users listing. */
router.post("/addAddress", function (req, res, next) {
  pool.query(
      "select * from userAddresses where addressone=? and mobileno=?", [req.body.address1, req.body.mobileno], function (error, result) {
          if (error)
              res.status(500).json({ result: false });
          else {
              if(!result.length) {
                  pool.query("insert into userAddresses (mobileno, addressone, addresstwo, state, city, zipcode) values(?, ?, ?, ?, ?, ?)", [req.body.mobileno, req.body.address1, req.body.address2, req.body.state, req.body.city, req.body.zipcode], function (error, result) {
                      if (error)
                          res.status(500).json({result: false});
                      else {
                          pool.query(
                              "select addressstatus from userdetails where mobileno=?", [req.body.mobileno], function (error, result) {
                                  if (error)
                                      res.status(500).json({ result: false });
                                  else {
                                      if(!result[0].addressstatus) {
                                          console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
                                          pool.query("update userdetails set addressone=?, addresstwo=?, state=?, city=?, zipcode=?, addressstatus=true where mobileno=?", [req.body.address1, req.body.address2, req.body.state, req.body.city, req.body.zipcode, req.body.mobileno], function (error, result) {
                                              if (error){
                                                  console.log("xxxxxxxxxxxxxxxxxxxxxx"+error)
                                                  res.status(500).json({result: false});
                                              }
                                              else
                                                  res.status(200).json({result: true});
                                          })
                                      }
                                      else
                                          res.status(200).json({result: true});
                                  }

                              })
                      }
                  })
              }
              else
                  res.status(200).json({result: "exist"});
          }
      }
)
});

router.post("/displayall", function (req, res, next) {
    pool.query(
        "select * from userAddresses where mobileno=?", [req.body.mobileno],
        function (error, result) {
            if (error)
                res.status(500).json({ result: false });
            else
                res.status(200).json(result);
        }
    );
});

router.post('/deleteAddress', function (req, res) {
    pool.query (
        "delete from userAddresses where addressid=?", [req.body.addressid],
        function (error, result) {
            if (error)
                res.status(500).json({result: false});
            else
                res.status(200).json({result: true});
        }
    )
});

module.exports = router;
