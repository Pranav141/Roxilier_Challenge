const mongoDb= require('./db.js')
const Item= require('./models/item.js');
const express = require('express');
const bodyParser= require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
express.json()
const app=express()
globalThis.fetch = fetch
const url='https://s3.amazonaws.com/roxiler.com/product_transaction.json'

const port=3000;//Port can be changed from here.


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.get('/createDB',async (req,res)=>{
    const response=await fetch(url)
    .then((response) => response.json())
    Item.insertMany(response).then(()=>{
        res.json({success:true})
    }).catch((err)=>{
        res.json({
            success:false,
            msg:err
        })
    })
})
app.get('/api/v1/stats/:month',async (req,res)=>{
    const response=await Item.find()
    
let totalSale=0;
let totalSoldItems=0;
let totalNotSoldItems=0;
    response.forEach((val)=>{
        if(monthNames[val.dateOfSale.getMonth()]==req.params.month){
            if(val.sold===true){
                totalSoldItems++;
                totalSale+=val.price
            }
            else{
                totalNotSoldItems++;
            }
        }
    })
    res.json({totalSale:totalSale,totalSoldItems:totalSoldItems,totalNotSoldItems:totalNotSoldItems})
})
app.get('/api/v1/barchart/:month',async (req,res)=>{
    let priceRange={'0-100':0,'101-200':0,'201-300':0,'301-400':0,'401-500':0,'501-600':0,'601-700':0,'701-800':0,'801-900':0,'901-above':0}
    let ranges=Object.keys(priceRange);
    const upperRange=[100,200,300,400,500,600,700,800,900]
    const response=await Item.find();
    const data=response.filter((val)=>{//bas month ka data
        if(req.params.month==monthNames[val.dateOfSale.getMonth()]){
            return val;
        }
    })
    data.forEach((val)=>{
        let temp=false;
        for (let i = 0; i < upperRange.length; i++) {
            if(val.price<=upperRange[i]){
                priceRange[ranges[i]]++;
                temp=true;
                break;
            }
        }
        if(!temp){
            priceRange[ranges[ranges.length-1]]++;
        }
    })
    res.json(priceRange)
})
app.get('/api/v1/piechart/:month',async (req,res)=>{
    const response=await Item.find();
    let result={};
    const data=response.filter((val)=>{//bas month ka data
        if(req.params.month==monthNames[val.dateOfSale.getMonth()]){
            return val;
        }
    })
    data.forEach((val)=>{
        if (result.hasOwnProperty(val.category)) {
            result[val.category]+=1;
        }
        else{
            result[val.category]=1
        }
    })
    result['month']=req.params.month;
    res.json(result);
})
app.get('/api/v1/getAll/:month',async (req,res)=>{
    result={}
    await fetch(`http://localhost:3000/api/v1/stats/${req.params.month}`)
    .then((response) => response.json())
    .then((data) => result = Object.assign(result,data));
    await fetch(`http://localhost:3000/api/v1/barchart/${req.params.month}`)
    .then((response) => response.json())
    .then((data) => result = Object.assign(result,data));
    await fetch(`http://localhost:3000/api/v1/piechart/${req.params.month}`)
    .then((response) => response.json())
    .then((data) => result = Object.assign(result,data));
    // console.log(result);
    res.json(result);
})
app.listen(port,()=>{
    console.log("Server Running on http://localhost:3000");
})