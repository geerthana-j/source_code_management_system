const express=require('express');
const cors = require("cors");
const multer = require('multer');
const {jsonData}=require('./JSONDataStruct.js');
const GridFsStorage = require('multer-gridfs-storage');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
const uri ="mongodb+srv://vembu_karthick:0sJ98iEuQsh3qjxY@cluster0.mslvczx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PORT='8005';
const sampleJsonData={
    userName:"",
    repos:[
        {
        repoName:"",
        size:"",
        repoFiles:[{
            fileName:"",
            fileSize:"",
            content:"",
            noOfCommits:"",
            version:[{
                content:"",
                dateTime:"",
                commiterName:"",
                }],
        }],
        stars:""
        }
    ],
    password:"",
    commits:[{
        repoName:"",
        fileName:"",
        commiter:"",
        dateTime:"",
        content:""
    }]
};

const repoSampleJsonData= {
    repoName:"",
    size:"",
    repoFiles:[{
        fileName:"",
        fileSize:"",
        content:"",
        noOfCommits:"",
        version:[{
            content:"",
            dateTime:"",
            commiterName:"",
            }],
    }],
    stars:""
};

const repoFileSampleJsonData={
    fileName:"",
    fileSize:"",
    content:"",
    noOfCommits:"",
    version:[{
        content:"",
        dateTime:"",
        commiterName:"",
        }],
};

const fileVersionSampleJsonData={
    content:"",
    dateTime:"",
    commiterName:""
};

function createJsonData(sample){
    
    const sampleData=sampleJsonData;
    sampleData.userName=sample.userName;
}
async function deleteDocument(name,repoData){
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
async function findByName(uN){
    var data;
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        const collection = client.db('database1').collection('collection1');
        console.log('Welcome');
        data=await collection.find({ userName:uN }).toArray();
        console.log(data);
        console.log('end');
    }
    catch (err) {
        console.log(err.stack);
    }    
    finally {
        await client.close();
    }
    return data;
   // await updateDocument(uN,arrRes);
}
async function createJsonData(repo,body){
    const repoFilesArr=body.repoFiles;
    const repoName=body.repoName;
    const repoSampledata=repo;
    repoSampledata.repoName=repoName;
    console.log(repoFilesArr.length);
    console.log(repoName);
    console.log(repoSampledata);
    console.log(repoSampledata.repoName);
    for(let i = 0; i < repoFilesArr.length; i++) {
        let repoFileSampleJsonData={
                fileName:"",
                fileSize:"",
                content:"",
                noOfCommits:"",
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
        repoFileSampleJsonData.noOfCommits="0";
        console.log(repoFileSampleJsonData);
       await repoSampledata.repoFiles.push(repoFileSampleJsonData);
    //   console.log(repoSampledata.repoFiles[1]);
    }
    //  for(let i=0;i<repoSampledata.repoFiles.length;i++){
    //    console.log(repoSampledata.repoFiles[i].fileName);
    // }
    return repoSampledata;
}
async function insertData(newData) {
    try {
            console.log('hi');
            await client.connect();
            console.log('Connected to MongoDB Atlas');
            const collection = client.db('database1').collection('collection1');
            try{
                await collection.insertOne(newData);
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
        return 1;
}
app.post('/commit_send',async (req,res)=>{
    console.log(req.body.repoFiles.length);
    const jsonDataSchema=jsonData;
    const repoData=jsonDataSchema.repos[0];
    console.log(repoData);
    const uName=req.body.userName;
    const fetchedData = await findByName(uName);
    console.log(fetchedData)
    const repoUpdatedData = await createJsonData(repoData,req.body);
    for(let i=0;i<repoUpdatedData.repoFiles.length;i++){
       console.log(repoUpdatedData.repoFiles[i].fileName);
    }
    console.log(fetchedData[0]);
   // console.log(Object.keys(fetchedData));
   // console.log(fetchedData[0].repos);
    fetchedData[0].repos.push(repoUpdatedData);
    const deleteResponse=await deleteDocument(uName);
    console.log(fetchedData[0]);
    const insertResponse=await insertData(fetchedData[0]);
    console.log(insertResponse);
    const result={};
    result.data=insertResponse;
    res.send(result);
    //    run().catch(console.dir);
});
app.post("/fileupload",async (req,res)=>{
    console.log(req.body.repoFiles.length);
    const jsonDataSchema=jsonData;
    const repoData=jsonDataSchema.repos[0];
    console.log(repoData);
    const uName=req.body.userName;
    const fetchedData = await findByName(uName);
    console.log(fetchedData)
    const repoUpdatedData = await createJsonData(repoData,req.body);
    for(let i=0;i<repoUpdatedData.repoFiles.length;i++){
       console.log(repoUpdatedData.repoFiles[i].fileName);
    }
    console.log(fetchedData[0]);
   // console.log(Object.keys(fetchedData));
   // console.log(fetchedData[0].repos);
    fetchedData[0].repos.push(repoUpdatedData);
    const deleteResponse=await deleteDocument(uName);
    console.log(fetchedData[0]);
    const insertResponse=await insertData(fetchedData[0]);
    console.log(insertResponse);
    const result={};
    result.data=insertResponse;
    res.send(result);
    //    run().catch(console.dir);
});
app.listen('8002', () => {
    console.log(`Server is running on port 8002.`);
  });