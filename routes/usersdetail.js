var express = require("express");
var router = express.Router();
var pool = require("./pool.js");
/* GET users listing. */
router.post("/checkusermobilenumber", function (req, res, next) {
  pool.query(
    "select * from userdetails where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        if (result.length === 1)
          res.status(200).json({ result: true,data: result[0] });
        else res.status(200).json({ result: false });
      }
    }
  );
});

router.post("/displayall", function (req, res, next) {
    pool.query("select * from userdetails where mobileno=?", [req.body.mobileno], function (error, result) {
            if (error)
                res.status(500).json({ result: false });
            else
                res.status(200).json(result[0]);
        }
    );
});

router.post("/insertuserdetails", function (req, res, next) {
  pool.query(
    "insert into userdetails set emailid=?,mobileno=?,firstname=?,lastname=?,password=?,addressstatus=false,status='active'",
    [
      req.body.emailid,
      req.body.mobileno,
      req.body.firstname,
      req.body.lastname,
      req.body.password,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/editAddress", function (req, res, next) {
    pool.query(
        "update userAddresses set addressone=?, addresstwo=?, city=?, state=?, zipcode=? where addressid=?",
        [
            req.body.address1,
            req.body.address2,
            req.body.city,
            req.body.state,
            req.body.zipcode,
            req.body.addressid
        ],
        function (error, result) {
            if (error) {
                res.status(500).json({ result: false });
            } else {
                if(req.body.default) {
                    console.log("yessssssssssssssssssssssssssssss")
                    pool.query(
                        "update userdetails set addressone=?, addresstwo=?, city=?, state=?, zipcode=?, addressstatus=? where mobileno=?",
                        [
                            req.body.address1,
                            req.body.address2,
                            req.body.city,
                            req.body.state,
                            req.body.zipcode,
                            true,
                            req.body.mobileno
                        ],
                        function (error, result) {
                            if (error) {
                                res.status(500).json({ result: false });
                                return 0;
                            } else {
                                res.status(200).json({ result: true });
                            }
                        }
                    );
                }
                else
                    res.status(200).json({ result: true });
            }
        }
    );
});

router.post("/defaultAddress", function (req, res, next) {
    pool.query(
        "update userdetails set addressone=?, addresstwo=?, city=?, state=?, zipcode=?, addressstatus=? where mobileno=?",
            [
                req.body.address1,
                req.body.address2,
                req.body.city,
                req.body.state,
                req.body.zipcode,
                true,
                req.body.mobileno
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

router.post("/updateuserdetails", function (req, res, next) {
  pool.query(
    "update userdetails set addressone=?,addresstwo=?,state=?,city=?,zipcode=?,addressstatus=true where mobileno=?",
    [
      req.body.addess1,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.zipcode,
      req.body.mobileno,

    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/addCart", function (req, res, next) {
    pool.query(
        "update userdetails set cart=? where mobileno=?",
        [
            req.body.cart,
            req.body.mobileno
        ],
        function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).json({ result: false });
            } else {
                res.status(200).json({ result: true });
            }
        }
    );
});

router.post("/updateUserData", function (req, res, next) {
    pool.query(
        "update userdetails set firstname=?, lastname=?, emailid=?, password=?, mobileno=? where mobileno=?",
        [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.password,
            req.body.mobileno,
            req.body.oldmobileno
        ],
        function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).json({ result: false });
            } else {
                res.status(200).json({ result: true });
            }
        }
    );
});

module.exports = router;
