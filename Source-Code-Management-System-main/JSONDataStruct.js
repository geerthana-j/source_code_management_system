const jsonData={
    userName:"",
    repos:[
        {
        repoName:"",
        size:"",
        access:0,
        repoFiles:[
        {
            fileName:"",
            filepath:"",
            fileSize:"",
            content:"",
            noOfCommits:0,
            version:[{
                content:"",
                dateTime:"",
                commiterName:"",
                }],
            
        }
    ],
        stars:0
        }
    ],
    commits:[
    {
        
        fileDetails:{
            fileName:"",
            filepath:"",
            fileSize:"",
            content:"",
        },
        commiter:"",
        dateTime:"",
        earlier:""
    }],
    password:""
}
//console.log(jsonData);
module.exports = { jsonData }