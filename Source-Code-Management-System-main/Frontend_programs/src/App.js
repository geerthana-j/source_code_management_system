import React,{ useState,useEffect} from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import OrgLogin from './OrgLogin';
import UserLogin from './UserLogin';
import OrgUserRegister from './OrgUserRegister'
import UserRegister from './UserRegister';
import HomePage from "./HomePage";
import UserHomeProject from './UserHomeProject';
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import ProjectList from "./ProjectList";
import FinalList from './FinalList';
import CodePage from "./CodePage";
import SearchFinalList from "./SearchFinalList";
import SearchCodePage from "./SearchCodePage";
import CommitList from "./CommitList";
import CommitDiff from "./CommitDiff";
function App(){
  // const [message, setMessage] = useState({});
  // useEffect(() => {
  //   fetch("http://localhost:8000/")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data));
  // }, []);
  return (//<h1>vembu_karthick+{message._id}</h1>
  <div>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/userReg" element={<UserRegister/> } />
        <Route path="/orgUserLogin" element={<UserLogin/>} />
        <Route path="/orgUserReg" element={<UserRegister/> } />
        <Route path="/userHome" element={<UserHomeProject/> } />
        <Route path="/newrepo" element={<FileUploader/> } />
        <Route path="/filelist" element={<FileList/> } />
        <Route path="/projectlist" element={<ProjectList/> } />
        <Route path="/finallist" element={<FinalList/>} />
        <Route path="/codepage" element={<CodePage/>}/>
        <Route path="/searchfinallist" element={<SearchFinalList/>} />
        <Route path="/searchcodepage" element={<SearchCodePage/>}/>
        <Route path="/commitdiff" element={<CommitDiff/>}/>
        <Route path="/commits" element={<CommitList/>}/>
        
        
    </Routes>
  </div>
  );
}

export default App;