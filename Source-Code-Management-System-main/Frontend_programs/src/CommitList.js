import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
function CommitList(){
   const[username,setUserName]=useState('');
    const[files,setFiles]=useState([]);
    const navigate=useNavigate();
   // const reqbody={};
   useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        let userObject = null;
        console.log(storedUser);
        if (storedUser !== null) {
        userObject = JSON.parse(storedUser);
       setUserName(userObject.mail);
        }
    },[]);
    useEffect(() => {
        if (username !== '') {
        fetchdata();
        }
    }, [username]);
    function fetchdata(){
        try {
            console.log('hello');
            fetch("http://localhost:8003/commit_list", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({username:username})
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
                }).then(data => {
                    console.log(data);
                    setFiles(data.result);
                })
            } 
            catch (error) {
                console.error(error);
            }
    };
    useEffect(() => {
        const listItems = document.body.addEventListener( 'click', function ( event ) {
            console.log(event.target.innerText);
            const arr=event.target.innerText.split('-');
            if(event.target.className=="commitlist")

            navigate(`/commitdiff?commitreponame=${arr[0]}&commitfilename=${arr[1]}`);
        });  
     },[]);
    return(<>
        <p>Hello -{username} , Welcome to the list of version queue</p>
        <ul>
      {files && files.map((file, index) => (
        // onClick={() => getFiles(file)}
        <div className="commitlist" key={index}  >
          {/* <FaFolder /> */}
          {file.reponame}-{file.filename}
        </div>
      ))}
    
    </ul>
    </>)
}
export default CommitList;