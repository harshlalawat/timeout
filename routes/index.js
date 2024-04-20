const router = require('express').Router();

router.get("/", function(req,res){
    console.log("hello");
})

router.post("/", function(req, res){
    setTime(req.body);
});

module.exports = {router};