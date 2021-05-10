const express=require('express');
const path=require('path');
app=express();
const port=8000;
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true ,useUnifiedTopology: true});

//mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    add: String,
    desc: String
  });

const contact = mongoose.model('contact', contactschema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params={ };
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params={ };
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
   var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("Saved");
    }).catch(()=>{
        res.status(400).send("not saved")
    })

    // res.status(200).render('contact.pug',params);
})

app.listen(port,()=>{
    console.log(`Server connected successfully on port ${port}`);
})