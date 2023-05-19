import React ,{useState,useEffect} from "react";
import { useLocation,useNavigate } from 'react-router-dom';
function SearchFinalList(){
    const location = useLocation();
    const navigate=useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const reponame = searchParams.get('reponame');
    const searchusername = searchParams.get('searchusername');
    const reqbody={};
    reqbody.reponame=reponame;
    reqbody.username=searchusername;
    const[files,setFiles]=useState();
    useEffect(() => {
        try {
            console.log('hello');
            fetch("http://localhost:8003/search_file_list", {
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
           if(event.target.className=="searchfinallist"){
            console.log(event.target.innerText);
            const filename=event.target.innerText;
            navigate(`/searchcodepage?searchusername=${searchusername}&reponame=${reponame}&filename=${filename}`);
           }
        });  
     },[]);
    return(<>
    <p> {reponame} - Project</p>
    {files && files.repoFiles.map((file, index) => (
        // onClick={() => getFiles(file)}
        <div className="searchfinallist" key={index}  >
          {file.fileName}
        </div>
      ))}
    </>)
}
export default SearchFinalList;