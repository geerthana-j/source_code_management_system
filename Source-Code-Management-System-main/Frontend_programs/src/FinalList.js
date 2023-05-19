import React ,{useState,useEffect} from "react";
import { useLocation,useNavigate } from 'react-router-dom';
function FinalList(){
    const location = useLocation();
    const navigate=useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const reponame = searchParams.get('reponame');
    const reqbody={};
    const[files,setFiles]=useState();
    const [username,setUser]=useState("");
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        let userObject = null;
        console.log(storedUser);
        if (storedUser !== null) {
          userObject = JSON.parse(storedUser);
          setUser(userObject.mail);
        }
        reqbody.reponame=reponame;
        reqbody.username=username;
   },[username]);
    useEffect(() => {
        try {
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
    },[]);
    useEffect(() => {
        const listItems = document.body.addEventListener( 'click', function ( event ) {
            if(event.target.className=="finallist"){
            console.log(event.target.innerText);
            const filename=event.target.innerText;
            
            navigate(`/codepage?reponame=${reponame}&filename=${filename}`);
        //  navigate()
    }
        });  
     },[]);
    return(<>
    <p> {reponame} - Project</p>
    {files && files.repoFiles.map((file, index) => (
        // onClick={() => getFiles(file)}
        <div className="finallist" key={index}  >
          {file.fileName}
        </div>
      ))}
    </>)
}
export default FinalList;