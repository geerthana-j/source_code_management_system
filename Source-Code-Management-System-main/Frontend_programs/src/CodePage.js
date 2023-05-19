import React ,{useState,useEffect} from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
function CodePage(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const reponame = searchParams.get('reponame');
    const filename = searchParams.get('filename');
    const[file,setFile]=useState();
    const [editorCode, setEditorCode] = useState("");
    const [username,setUser]=useState("");
    const reqbody={};
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
        reqbody.filename=filename;
   },[username]);
    const handleChange = (newCode) => {
        setEditorCode(newCode);
    };
    useEffect(() => {
    try {
        console.log('hello');
        fetch("http://localhost:8003/code_page", {
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
                setFile(data.result);
                setEditorCode(data.result.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    },[]);
    // function handleCommit(){
    //     const bodyreq={}
    //     bodyreq.code=editorCode;
    //     try {
    //         console.log('commit_send');
    //         fetch("http://localhost:8003/commit_send", {
    //             method: "POST",
    //             headers: {
    //             "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(bodyreq)
    //         }).then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //             }).then(data => {
    //                 console.log(data);
    //                 setFile(data.result);
    //             })
    //         }
    //         catch (error) {
    //             console.error(error);
    //         }
    // }
    // useEffect(() => {
    //     const listItems = document.body.addEventListener( 'click', function ( event ) {
    //         console.log(event.target.innerText);
    //         const p=event.target.innerText;

    //         navigate(`/finallist?reponame=WeatherAPI`);
    //     //  navigate()
    //     });  
    //  },[]);
    return(<>
    <p> {reponame} - Project & File name is {filename}</p>
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={handleChange}
      name="code-editor"
      value={editorCode}
      fontSize={16}
      width="100%"
      height="500px"
      editorProps={{ $blockScrolling: true }}
    />
    {/* <button className="commitbutton" onClick={handleCommit}>Send For Commit</button> */}
    </>)
    
}
export default CodePage;