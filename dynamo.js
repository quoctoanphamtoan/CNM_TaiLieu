let AWS = require('aws-sdk');
const { json } = require('body-parser');
let express = require('express');

let router = express.Router();

let awsConfig = {
    "region": "ap-southeast-1",
    "accessKeyId": "", "secretAccessKey": ""
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
let table = "BaiTap2_Toan";

router.get('/', (req, res) => {


    let params = {
        TableName: table,
     
    };
    
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("sai roi");
            handleError(err, res);
        } else {
            var listsp =[];
            // listsv.push(json(data.Items));
      
            data.Items.forEach((sp)=>{
                listsp.push(sp);
            });
            res.render('index', {
                error: false,
                sanpham: listsp
               
                
            });
            // res.json(data.Items)
           
        }
     });
});
router.get('/sanpham/delete/:maSanPham',(req,res)=>{
    var maSanPham = req.params.maSanPham;
    var params = {
        TableName:table,
        Key:{
            "maSanPham":maSanPham,
            
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
           res.json({"mes:":err})
        } else {
           
           res.redirect("/");
        }
    });
    
});
router.post('/sanpham/add',(req,res)=>{
    var maSanPham = req.body.txtma;
    var tenSanPham = req.body.txtname;
    var gia = req.body.txtgia;
    var soLuong = req.body.txtsl;

    var params = {
        TableName:table,
        Item:{
            "maSanPham": maSanPham,
            "tenSanPham": tenSanPham,
            "gia": gia,
            "soLuong":soLuong
            
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            res.json({"err":err});
        } else {
            res.redirect("/");
        }
    });
})

module.exports = router;