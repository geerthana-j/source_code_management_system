const express=require('express');
const cors = require("cors");
const {jsonData}=require('./JSONDataStruct.js');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const uri ="mongodb+srv://vembu_karthick:0sJ98iEuQsh3qjxY@cluster0.mslvczx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var arrRes;
async function run(uN) {
try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        const collection = client.db('database1').collection('collection1');
        console.log('Welcome');
        arrRes=await collection.find({ userName:uN }).toArray();
        console.log(arrRes);
        console.log('end');
    }
    catch (err) {
        console.log(err.stack);
    }    
    finally {
        await client.close();
    }
    return arrRes;
}    
async function run1(body) {
    const newData=jsonData;
    newData.userName=body.mail;
    newData.password=body.pass;
    // const final={}
    // final.data=Json
    try {
            await client.connect();
            console.log('Connected to MongoDB Atlas for insertion');
            const collection = client.db('database1').collection('collection1');
            console.log('Welcome');
            await collection.insertOne(newData);
            console.log('end');
        }
        catch (err) {
            console.log(err.stack);
        }    
        finally {
            await client.close();
        }
}
async function userCheck(body){
    console.log(body);
    // const uName=req.body.userName;
    // const pass=req.body.pass;
    // const cpass=req.body.cpass;
    const uName=body.mail;
    const pass=body.pass;
    const cpass=body.cpass;
    const userData= await run(uName).catch(console.dir);
    console.log(userData);
    if(userData.length!=0){
        console.log('Account already found');
        return 'Account already found';
    }
    else{
        if(pass==cpass){
            console.log('pass matched');
            await run1(body).catch(console.dir);
            return 'Account Registered succesfully';
        }
        else{
            console.log('Password Mismatched');
            return 'Password Mismatched';
        }
    }
}        
app.post("/register",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const result =await userCheck(req.body);
        resu.result=result;
        res.send(resu);
      } catch (error){
        console.log(error);
        res.status(500).send(error);
      }
   
});
app.listen(8003, () => {
     console.log(`Server is running on port 8003.`);
});