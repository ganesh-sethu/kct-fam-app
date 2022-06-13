const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const { PRINCIPAL } = require("../common/constants");
const path = require("path");
const { route } = require("./requestsRoute");
const fs = require("fs");


router.get("/", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM requests r \
      join users u on r.emp_id = u.emp_id \
      join departments d on d.department=u.department \
     where  approval_status=? and JSON_EXTRACT(event_info,'$.From') > ?",
    [ PRINCIPAL + 1,new Date().toISOString().split('T')[0]],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          events: [...result.map(item => {
            return {...item,password:undefined}
          })],
        });
      } else {
        res.send({
          msg: "No events found",
        });
      }
    }
  );
});

router.get("/completed", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM requests r \
      join users u on r.emp_id = u.emp_id \
      join departments d on d.department=u.department \
     where  approval_status=? and JSON_EXTRACT(event_info,'$.From') < ?",
    [ PRINCIPAL + 1,new Date().toISOString().split('T')[0]],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          events: [...result.map(item => {
            return {...item,password:undefined}
          })],
        });
      } else {
        res.send({
          msg: "No events found",
        });
      }
    }
  );
});

router.post("/proof",authenticate.auth,(req,res) => {
  if(req.files){
      const file = req.files.file;
      const proofFolder = path.join(__dirname,'../','proof/' +req.body.request_id+'.pdf');
      file.mv(proofFolder,err => {
        if(err){
          console.log(err)
          return res.status(500).send(err)
        }
        db.query(
          "update requests set proof=? where request_id=?",
          [req.body.request_id+'.pdf',req.body.request_id],
          (error, result) => {
            if (error) {
              console.log(error);
              res.status(500).send({
                error,
              });
            } else if (result && result.affectedRows) {
              res.send({
                msg: "Proof uploaded successfully",
              });
            } else {
              res.status(500).send({
                result,
              });
            }
          }
        );
      })
  }else{
    res.status(500).send({
      msg : "No files"
    })
  }
  
  
})

router.get("/proof",authenticate.auth,(req,res) => {
  const request_id = req.query.request_id
  const fileName = path.join(__dirname,'../','proof/' +request_id+'.pdf');
  res.download(fileName)
})

router.post("/proof/delete",authenticate.auth,(req,res) => {
  const request_id = req.body.request_id
  const fileName = path.join(__dirname,'../','proof/' +request_id+'.pdf');
  fs.unlink(fileName,(err) => {
    if(err){
      return res.status(500).send(err)
    }
    db.query(
      "update requests set proof=? where request_id=?",
      [null,req.body.request_id],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send({
            error,
          });
        } else if (result && result.affectedRows) {
          res.send({
            msg: "Proof deleted successfully",
          });
        } else {
          res.status(500).send({
            result,
          });
        }
      }
    );

  })
})


module.exports = router;
