import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import ProjectList from "./ProjectList";
import './UserHomeProject.css';
function UserHomeProject(){
  const [searchData, setSearchData]=useState("");
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
    
    // const [userCreate, setUserCreate]=useState(false);
    // const [downDiv,setDownDiv] =useState(false);
    // const [boolSearch,setBoolSearch]=useState(false);
    
    // function handleDownDiv(val)
    // {
    //     if(val==='1'){
    //         setUserCreate(true);
    //     }
        
      //     setDownDiv(true);
      // }
    // function handleSearch(){
    //  //   setSearchData(event.target.value);
    //  setDownDiv(true);
    //     setBoolSearch(true);
    // }
    
    async function handleChangeText(event){
   //     setSearchData(event.target.value);
        await setSearchData(event.target.value);
        console.log(searchData);
    }
    const navigate=useNavigate();
    useEffect(() => {
        const handleButton1Click = (e) => {
          if(e.target.className="newrepo"){
          navigate(`/newrepo`);
        }
        };
        const handleButton2Click = (e) => {
            if(e.target.className="filelist"){
            navigate(`/filelist`);
          }
        };
        // useEffect(() => {
        //   // second useEffect hook
        //   console.log('Second useEffect hook called');
        // }, []);
        const handleButton3Click = (e) => {
            console.log(e.target)
            if(e.target.className="projectlist"){
             navigate(`/projectlist?searchusername=${searchData}`);
            }
        }
        
        const handleButton4Click = (e) => {
          if(e.target.className="commits"){
          navigate('/commits');
          }
        };
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
          if (button.className === 'newrepo') {
            button.addEventListener('click', handleButton1Click);
          } else if (button.className === 'filelist') {
            button.addEventListener('click', handleButton2Click);
          } else if (button.className === 'projectlist') {
            button.addEventListener('click', handleButton3Click);
          } else if (button.className === 'commits') {
            button.addEventListener('click', handleButton4Click);
          }
        });
        
        return () => {
          buttons.forEach((button) => {
            if (button.className === 'newrepo') {
              button.removeEventListener('click', handleButton1Click);
            } else if (button.className === 'filelist') {
              button.removeEventListener('click', handleButton2Click);
            } else if (button.className === 'projectlist') {
              button.removeEventListener('click', handleButton3Click);
            } else if (button.className === 'commits') {
              button.removeEventListener('click', handleButton4Click);
            }
          });
        };
      }, [navigate,searchData]);
    return(
        <div className="userHome">
            <div>
            <input type="search" id="query" value={ searchData} name="q" onChange={handleChangeText} placeholder="Search..."/> 
            </div>
            <button className="newrepo" >New Project</button>
            <button className="filelist" >File List</button>
            <button className="projectlist" >Search</button>
            <button className="commits">Commits</button>
        {/* {!downDiv && <button onClick={handleSearch}>Search</button></div>}
        {!downDiv && <button id="button1" onClick={()=>handleDownDiv('1')}>Create my project</button>}
        {!downDiv && <button id="button2" onClick={()=>handleDownDiv('2')}>My Project's - {username}</button>}
        {downDiv && userCreate && !boolSearch && <FileUploader pvalue={username}/>}
        {downDiv && !userCreate && !boolSearch && <FileList pvalue={username}/>}
        {downDiv && !userCreate && boolSearch && <ProjectList pvalue={searchData}/>} */}
        </div>
    );
}
export default UserHomeProject;