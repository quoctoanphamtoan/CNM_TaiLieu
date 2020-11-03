let app=require('express')();
let dynamoRoute= require('./dynamo');
let bodyparser  = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.set("views",'./../views');
app.use('/',dynamoRoute);

app.listen('4000',(err)=>{
    if(err) console.log(err)
    else console.log('server running');
})

module.exports=app;