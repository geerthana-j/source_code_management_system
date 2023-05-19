import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
function ProjectList(props){
    const[files,setFiles]=useState([]);
    const location = useLocation();
    const navigate=useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const searchusername = searchParams.get('searchusername');
    const bodyreq={};
    bodyreq.searchusername=searchusername;
    useEffect(() => {
        try {
            console.log('hello');
            fetch("http://localhost:8003/project_list", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyreq)
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
                if(event.target.className=="searchfilelist"){
                   console.log(event.target);
               
                const p=event.target.innerText;
                navigate(`/searchfinallist?searchusername=${searchusername}&reponame=${p}`);
            }
            //  navigate()
            });  
         },[]);
    return (
    <>
        <p>{props.pvalue}</p>
        <ul>
      {files && files.map((file, index) => (
        <div className="searchfilelist" key={index}  >
          <FaFolder />
          {file}
        </div>
      ))}
    </ul>
    </>
    )
};
export default ProjectList;