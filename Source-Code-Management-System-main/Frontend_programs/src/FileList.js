import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaFolder } from 'react-icons/fa';
function FileList(){
    const navigate=useNavigate();
    const reqbody={}
    console.log('hello');
    console.log(reqbody);
    const[files,setFiles]=useState([]);
    const [username,setUser]=useState("");
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        let userObject = null;
        console.log(storedUser);
        if (storedUser !== null) {
          userObject = JSON.parse(storedUser);
          setUser(userObject.mail);
        }
   },[]);
   useEffect(() => {
    if (username !== '') {
    fetchdata();
    }
}, [username]);
    function fetchdata() {
        try {
            reqbody.username=username;
            console.log('hello');
            fetch("http://localhost:8003/file_list", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(reqbody)
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
            if(event.target.className=='fileist'){
            const p=event.target.innerText;

            navigate(`/finallist?reponame=${p}`);
        }
        //  navigate()
        });  
     },[]);
    // function getFiles(item){
    //     console.log(item);
    //     
    // }
    return (<>
    <div id="usr">{username}'s Project</div>
    {/* {   
      files.map((file, index) => (
      <button key={index}> {file.name}
      </button>
        ))
    } */}
      <table>
        <tr> <th>Folder name</th>
      <th>Access Type</th>
      <th>No of files</th> 
      <th>Stars </th></tr>
     
      <tr>
      {files && files.map((file, index) => (
        // onClick={() => getFiles(file)}
        <div className="fileist" key={index}  >
        <td> <FaFolder /> {file.repoName}</td>
        <td>{file.access==1?"Public":"Private"}</td>
        <td>{file.repoFiles.length}</td>
        <td>{file.stars}</td>
        </div>
      ))}
      </tr>
    </table>
    </>);
}

export default FileList;