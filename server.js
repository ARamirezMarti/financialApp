const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static(path.resolve(__dirname +'/public')));
app.use(require(path.join(__dirname,'./routes/routes')));

app.listen(3500,()=>{
    console.log('server listening on port 3500')
})
