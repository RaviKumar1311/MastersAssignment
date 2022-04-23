const express = require('express');
const data = require("./data/data1.json");
const categories = require("./data/categories.json")
const subcategories = require("./data/subcategories.json")
const bodyParser = require('body-parser')
const app=express();
const fs = require('fs')

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/myapi',(req,res)=>{
    res.send(data);
});

app.get('/categories',(req,res)=>{
    res.send(categories);
})

app.get('/subcategories',(req,res)=>{
    res.send(subcategories);
})

app.get('/myapi/category/:pc',(req,res)=>{
    let temp=[]
    let found = false;
    data.forEach(e=>{
        if(e.category===req.params.pc){
            temp.push(e)
            found = true;
        }
    })
    console.log(req.params.pc);
    if(!found){
        res.status(404).send("Not found");
    }
    else{
        res.status(200).send(temp)
    }
});

app.get('/myapi/subcategory/:sb',(req,res)=>{
    let temp=[]
    let found=false;
    data.forEach(e=>{
        if(e.subcategory===req.params.sb){
            temp.push(e)
            found = true;
        }
    })
    
    console.log(req.params.sb);
    if(!found){
        res.status(404).send("Not found");
    }
    else{
        res.status(200).send(temp)
    }
});

app.post('/myapi',(req,res)=>{
        const product = {
            name: req.body.name,
            category: req.body.category,
            subcategory: req.body.subcategory
        }
        data.push(product);
        

        fs.writeFileSync('./data/data1.json', JSON.stringify(data));
        res.status(200).send(product);
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("App is running on port "+port )
})