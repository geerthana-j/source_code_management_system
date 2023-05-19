const express=require('express');
const cors = require("cors");
const {jsonData}=require('./JSONDataStruct.js');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const uri ="mongodb+srv://vembu_karthick:0sJ98iEuQsh3qjxY@cluster0.mslvczx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(uN) {
    var arrRes;
    console.log('inRun '+uN)
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        const collection = await client.db('database1').collection('collection1');
        console.log('Welcome');
        arrRes=await collection.find({ userName:uN}).toArray();
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
async function userCheck(body){
    console.log(body);
    var uName=body.mail;
    var pass=body.pass;
    const userData= await run(uName).catch(console.dir);
    console.log(userData);
    if(userData.length!=0){
        console.log(userData[0].password);
        if(pass!=userData[0].password){
            console.log(pass + " "+ userData[0].password);
            return 1;
        }
        else{
            return 2;
        }
    }
    else{
        return 3;
    }

}  
async function insertFullData(body) {
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
async function deleteDocumentUpload(name){
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        const collection = client.db('database1').collection('collection1');
        console.log('Welcome');
        const result = await collection.deleteOne({userName:name});
        console.log('deleted user count:', result.deletedCount);
    }
    catch (err) {
        console.log(err.stack);
    }    
    finally {
        await client.close();
    }
}
async function regUserCheck(body){
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
        return 1;
    }
    else{
        if(pass==cpass){
            console.log('pass matched');
            await insertFullData(body).catch(console.dir);
            return 2;
        }
        else{
            console.log('Password Mismatched');
            return 3;
        }
    }
}  
async function createJsonDataUpload(body){
    const repoFilesArr=body.repoFiles;
    const repoName=body.repoName;
    const repoSampledata=jsonData.repos[0];
    repoSampledata.repoName=repoName;
    repoSampledata.access=parseInt(body.access);
    console.log(repoFilesArr.length);
    console.log(repoName);
    console.log(repoSampledata);
    console.log(repoSampledata.repoName);
    for(let i = 0; i < repoFilesArr.length; i++) {
        let repoFileSampleJsonData={
                fileName:"",
                filepath:"",
                fileSize:"",
                content:"",
                noOfCommits:0,
                version:[{
                    content:"",
                    dateTime:"",
                    commiterName:"",
                    }]  
        };
        repoFileSampleJsonData.fileName=repoFilesArr[i].name;
        repoFileSampleJsonData.filepath=repoFilesArr[i].filepath;
        console.log(repoFileSampleJsonData.filepath+" "+repoFilesArr[i].filepath);
        repoFileSampleJsonData.fileSize=repoFilesArr[i].size;
        repoFileSampleJsonData.content=repoFilesArr[i].content;
        console.log(repoFileSampleJsonData);
        await repoSampledata.repoFiles.push(repoFileSampleJsonData);
    //   console.log(repoSampledata.repoFiles[1]);
    }
    //  for(let i=0;i<repoSampledata.repoFiles.length;i++){
    //    console.log(repoSampledata.repoFiles[i].fileName);
    // }
    return repoSampledata;
}
async function insertDataUpload(newData) {
    console.log('Hi uploading the data');
    try {
            console.log('hi');
            await client.connect();
            console.log('Connected to MongoDB Atlas');
            const collection = client.db('database1').collection('collection1');
            try{
                const data=await collection.insertOne(newData);
                console.log(data);
                console.log('okay')
            }
            catch(err){
                console.log(err.stack);
            }
        }
    catch (err) {
        console.log(err.stack);
    }    
    finally {
        await client.close();
        }
    
}
async function createJsonDataCommit(body){
    const username=body.username;
    const editorCode=body.code;
    console.log();
    const searchusername=body.searchusername;
    const reponame=body.searchrepo;
    const filename=body.searchfile;
    const filepath=body.filepath;
    const earlier=body.earlier;
    const commitSampleData=jsonData.commits[0];
    commitSampleData.commiter=username;
    commitSampleData.dateTime=new Date().toString();
    commitSampleData.earlier=earlier;
    commitSampleData.fileDetails.fileName=filename;
    commitSampleData.fileDetails.filepath=filepath;
    commitSampleData.fileDetails.content= editorCode;
    commitSampleData.reponame=reponame;
    return commitSampleData;
}
app.post("/register",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const result =await regUserCheck(req.body);
        resu.result=result;
        res.send(resu);
      } catch (error){
        console.log(error);
        res.status(500).send(error);
      }
   
});      
app.post("/login",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const result =await userCheck(req.body);
        resu.result=result;
        res.send(resu);
      } 
      catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
});
app.post("/file_list",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const userData =await run(req.body.username).catch(console.dir);
        const arr=[];
        if(userData.length!=0){
            for(let i=0;i<userData[0].repos.length;i++){
                console.log(userData[0].repos[i]);
                arr.push(userData[0].repos[i]);
            }
        }
        resu.result=arr;
        console.log(resu);
        res.send(resu);
        }
        catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
   
});
app.post("/final_list",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const reponame=req.body.reponame;
        const userData =await run(req.body.username).catch(console.dir);
        if(userData.length!=0){
            for(let i=0;i<userData[0].repos.length;i++){
                console.log(userData[0].repos[i].repoName);
                if(userData[0].repos[i].repoName==reponame){
                    resu.result=userData[0].repos[i];
                    console.log(userData[0].repos[i]);
                }
            }
        }
        console.log(resu);
        res.send(resu);
        }
        catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
});
app.post("/code_page",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const reponame=req.body.reponame;
        const filename=req.body.filename;
        const userData =await run(req.body.searchusername).catch(console.dir);
      //  const arr=[];
        if(userData.length!=0){
            for(let i=0;i<userData[0].repos.length;i++){
                console.log(userData[0].repos[i].repoName);
                if(userData[0].repos[i].repoName==reponame){
                    const correctRepo=userData[0].repos[i];
                    console.log(userData[0].repos[i]);
                    for(let  i=0;i<correctRepo.repoFiles.length;i++){
                        if(correctRepo.repoFiles[i].fileName==filename){
                            console.log(correctRepo.repoFiles[i]);
                            resu.result=correctRepo.repoFiles[i];
                            break;
                        }
                    }
                }
            }
        }
        console.log(resu);
        res.send(resu);
        }
        catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
   
});
app.post("/project_list",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const userData =await run(req.body.searchusername).catch(console.dir);
        const arr=[];
        if(userData.length!=0){
            for(let i=0;i<userData[0].repos.length;i++){
                if(userData[0].repos[i].access==1){
                    arr.push(userData[0].repos[i].repoName);
                }
            }
            //conarr;
        }
        resu.result=arr;
        console.log(resu);
        res.send(resu);
        }
        catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
   
});
app.post("/search_file_list",async(req,res)=>{   
    try {
        console.log(req.body);
        const resu={};
        const reponame=req.body.reponame;
        const userData =await run(req.body.username).catch(console.dir);
      //  const arr=[];
        if(userData.length!=0){
            for(let i=0;i<userData[0].repos.length;i++){
                console.log(userData[0].repos[i].repoName);
                if(userData[0].repos[i].repoName==reponame){
                    resu.result=userData[0].repos[i];
                    console.log(userData[0].repos[i]);
                }
            }
        }
        console.log(resu);
        res.send(resu);
        }
        catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
   
});
app.post("/commit_list",async (req,res)=>{
    console.log('commit_list');
    console.log(req.body);
    const uName=req.body.username;
    const fetchedData = await run(uName).catch(console.dir);
    console.log(fetchedData);
    const arr=[];
    for(let i=1;i<fetchedData[0].commits.length;i++){
        const data={
            reponame:"",
            filename:""
        };
        data.reponame=fetchedData[0].commits[i].reponame;
        data.filename=fetchedData[0].commits[i].fileDetails.fileName;
        console.log(data);
        arr.push(data);
    }
    res.send({result:arr});
    //    run().catch(console.dir);
});
app.post("/fileupload",async (req,res)=>{
    console.log(req.body);
    const uName=req.body.userName;
    const fetchedData = await run(uName).catch(console.dir);
    console.log(fetchedData)
    const repoUpdatedData = await createJsonDataUpload(req.body);
    for(let i=0;i<repoUpdatedData.repoFiles.length;i++){
       console.log(repoUpdatedData.repoFiles[i].fileName);
    }
    console.log(fetchedData[0]);
   // console.log(Object.keys(fetchedData));
   // console.log(fetchedData[0].repos);
    fetchedData[0].repos.push(repoUpdatedData);
    console.log(fetchedData[0]);
    await deleteDocumentUpload(uName);
    await insertDataUpload(fetchedData[0]);
    const result={};
    result.data=1;
    res.send(result);
    //    run().catch(console.dir);
});
app.post('/commit_send',async (req,res)=>{
    console.log(req.body);
    const uName=req.body.searchusername;
    const fetchedData = await run(uName).catch(console.dir);
    console.log(fetchedData[0]);
    const commitUpdatedData = await createJsonDataCommit(req.body);
    console.log(commitUpdatedData);
    fetchedData[0].commits.push(commitUpdatedData);
    await deleteDocumentUpload(uName);
    await insertDataUpload(fetchedData[0]);
    res.send({result:1});
});
app.post("/commit_diff",async (req,res)=>{
    console.log('commit_diff');
    console.log(req.body);
    const uName=req.body.username;
    const reponame=req.body.commitreponame;
    const filename=req.body.commitfilename;
    const fetchedData = await run(uName).catch(console.dir);
    console.log(fetchedData);
    const result={};
    for(let i=1;i<fetchedData[0].commits.length;i++){
       if(fetchedData[0].commits[i].reponame===reponame && fetchedData[0].commits[i].fileDetails.fileName===filename){
            result.oldCode=fetchedData[0].commits[i].earlier;
            result.newCode=fetchedData[0].commits[i].fileDetails.content;
       }
    }
    res.send(result);
    //    run().catch(console.dir);
});
app.listen(8003, () => {
     console.log(`Server is running on port 8003.`);
});