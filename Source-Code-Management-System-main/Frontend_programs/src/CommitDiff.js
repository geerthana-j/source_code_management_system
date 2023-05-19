import React,{useState,useEffect} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import AceEditor from 'react-ace';
import { Diff } from 'react-diff-view';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
// import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
// import 'react-diff-view/style/index.css';
function CommitDiff(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const commitreponame = searchParams.get('commitreponame');
    const commitfilename = searchParams.get('commitfilename');
    const[oldCode,setOldCode]=useState("hello");
    const[newCode,setNewCode]=useState("hi");
    const[username,setUserName]=useState('');
    const reqbody={};
    // const newStyles = {
    //     variables: {
    //       light: {
    //         codeFoldGutterBackground: "#6F767E",
    //         codeFoldBackground: "#E2E4E5"
    //       }
    //     }
    //   };
    useEffect(()=>{
        async function setData(){
        const storedUser = localStorage.getItem('user');
        let userObject = null;
        console.log(storedUser);
        if (storedUser !== null) {
            userObject = JSON.parse(storedUser);
            setUserName(userObject.mail);
                // ()=>{
                //     fetchdata();
                // });
        }
        }
        setData();
    },[]);
    useEffect(() => {
        if (username !== '') {
        fetchdata();
        }
    }, [username]);
    function fetchdata(){
        try {
            reqbody.username=username;
            reqbody.commitreponame=commitreponame;
            reqbody.commitfilename=commitfilename;
            console.log('hello');
            console.log(reqbody);
            fetch("http://localhost:8003/commit_diff", {
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
                    setOldCode(data.oldCode);
                    setNewCode(data.newCode);
                })
            } 
            catch (error) {
                console.error(error);
            }
    };
    return(<>
    {/* <ReactDiffViewer
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
        compareMethod={DiffMethod.WORDS}
        styles={newStyles}
        leftTitle="Version A"
        rightTitle="Version B"
    /> */}
    {/* <p>Newer version</p>
      <AceEditor
      mode="javascript"
      theme="monokai"
      name="code-editor"
      value={newCode}
      fontSize={16}
      width="100%"
      height="500px"
      editorProps={{ $blockScrolling: true }}
      />
       <p>Older version</p>
       <AceEditor
      mode="javascript"
      theme="monokai"
      name="code-editor"
      value={oldCode}
      fontSize={16}
      width="100%"
      height="500px"
      editorProps={{ $blockScrolling: true }}
      import React from 'react'; */}



    <Diff oldValue={oldCode} newValue={newCode} splitView={true} />

</>);
}   
export default CommitDiff;