import React, { useState,useEffect } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import './FileUploader.css';
const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const[repoData,setRepoName]=useState({repoName:"",userName:""});
  const[username,setUserName]=useState("");
  const [value, setValue] = useState('');
  const handleChange = (event) => {
  setValue(event.target.value);
 };
  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    let userObject = null;
    console.log(storedUser);
    if (storedUser !== null) {
        userObject = JSON.parse(storedUser);
        setUserName(userObject.mail);
  }
   },[]);
  async function handleInputChange(event){
    const newFiles = [...files];
    for (let i = 0; i < event.target.files.length; i++) {
      newFiles.push(event.target.files[i]);
    }
    await setFiles(newFiles);
  };
  const handleInputTextChange=(event)=>{
    console.log('handletext');
    setRepoName({repoName:event.target.value,userName:username});
    console.log(repoData);
  }
  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...files];
    let currentDirectoryPath = "";
    const traverseFolder = (items) => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.isFile) {
          const path=item.fullPath;
          item.file((file) => {
             const newFile = new File([file], file.name, { type: file.type, lastModified: file.lastModified });
             Object.defineProperty(newFile, "webkitRelativePath", {
               value: path,
               writable: false,
             });
            console.log(newFile);
            newFiles.push(newFile);
            // setFiles(newFiles,(prevValue,newValue)=>{
            //   console.log(newValue);
            // });
          });
        } else if (item.isDirectory) {
          const directoryReader = item.createReader();
          const previousDirectoryPath = currentDirectoryPath;
        //  console.log(item.name);
          currentDirectoryPath += "/" + item.name;
          directoryReader.readEntries((entries) => {
        //    console.log(entries);
            traverseFolder(entries);
            currentDirectoryPath = previousDirectoryPath;
          });
        }
      }
    };
    const items = event.dataTransfer.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const entry = item.webkitGetAsEntry();
    //  console.log(i);
    //  console.log(entry);
      if (entry.isFile) {
    //    console.log('File')
    //    console.log(item);
        const path=item.fullPath;
        item.getAsFile().then((file) => {
          // Build the relative path by appending the current directory path to the file name
        //  const relativePath = currentDirectoryPath + "/" + item.name + "/" + file.name;
          const newFile = new File([file], file.name, { type: file.type, lastModified: file.lastModified });
          Object.defineProperty(newFile, "webkitRelativePath", {
            value: path,
            writable: false,
          });
          newFiles.push(newFile);
        });
      } else if (entry.isDirectory) {
        traverseFolder([entry]);
      }
    }
   // console.log(newFiles);
   setFiles(newFiles);
  };
  const handleRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    console.log('handleRemove');
    console.log(newFiles);
    setFiles(newFiles);
    console.log(files);
    console.log('after removal state');
  };
  function handleFileSelect(){
    console.log(files);
    filesToJSON(files, function(json) {
      console.log(json);
    });
  }  
  function sleep(lf_ms) {
    return new Promise(resolve => setTimeout(resolve, lf_ms));
  }
 async function filesToJSON(files, callback) {
    let filesArray = [];
   // await sleep(5000);
    let loadedCount = 0;
  //  console.log(files);
    let newrepoData=repoData;
    newrepoData.access=value;
  //  console.log(newrepoData);
    function handleFileLoad(file, fileReader) {
      if (file.type.includes("text")) {
        fileReader.readAsText(file);
        fileReader.onload = function() {
          let fileObject = {
            name: file.name,
            size: file.size,
            type: file.type,
            filepath:file.webkitRelativePath,
            lastModified: file.lastModified,
            content: fileReader.result
          };
          filesArray.push(fileObject);
          loadedCount++;
          if (loadedCount === files.length) {
            newrepoData.repoFiles=filesArray;
            const jsonData = JSON.stringify(newrepoData);
            console.log(jsonData);
            fetch("http://localhost:8003/fileupload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: jsonData
            })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(data => {
              console.log("Server response:", data);
              callback(jsonData);
            })
            .catch(error => {
              console.error("Fetch error:", error);
            });
          }
        };
      } else if (file.type.includes("image")) {
        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
          let fileObject = {
            name: file.name,
            size: file.size,
            type: file.type,
            filepath:file.webkitRelativePath,
            lastModified: file.lastModified,
            content: fileReader.result
          };
          filesArray.push(fileObject);
          loadedCount++;
  
          if (loadedCount === files.length) {
            newrepoData.repoFiles=filesArray;
            const jsonData = JSON.stringify(newrepoData);
            console.log(jsonData);
            fetch("http://localhost:8003/fileupload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: jsonData
            })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(data => {
              console.log("Server response:", data);
              callback(jsonData);
            })
            .catch(error => {
              console.error("Fetch error:", error);
            });
          }
        };
      }
      // } else {
      //   // Handle other types of files here
      //   console.log("Unsupported file type: " + file.type);
      //   loadedCount++;
  
      //   if (loadedCount === files.length) {
      //     newrepoData.repoFiles=filesArray;
      //     const jsonData = JSON.stringify(newrepoData);
      //     console.log(jsonData);
      //     fetch("http://localhost:8003/fileupload", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json"
      //       },
      //       body: jsonData
      //     })
      //     .then(response => {
      //       if (!response.ok) {
      //         throw new Error("Network response was not ok");
      //       }
      //       return response.json();
      //     })
      //     .then(data => {
      //       console.log("Server response:", data);
      //       callback(jsonData);
      //     })
      //     .catch(error => {
      //       console.error("Fetch error:", error);
      //     });
      //   }
      // }
      else{
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function() {
        const decoder = new TextDecoder("utf-8");
          let fileObject = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            content: decoder.decode(fileReader.result)
          };
          filesArray.push(fileObject);
          loadedCount++;
          if (loadedCount === files.length) {
            newrepoData.repoFiles=filesArray;
            const jsonData = JSON.stringify(newrepoData);
            console.log(jsonData);
            fetch("http://localhost:8003/fileupload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: jsonData
            })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(data => {
              console.log("Server response:", data);
              callback(jsonData);
            })
            .catch(error => {
              console.error("Fetch error:", error);
            });
           
          }
        };
      }
  }
  
    for (let i = 0; i < files.length; i++){
        let file = files[i];
        console.log(file);
        let fileReader = new FileReader();
        handleFileLoad(file, fileReader);
    }
  }
return(
  <>
    <label htmlFor="rn" >Enter your Repository Name </label>
    <input name="rn" value={repoData.repoName} onChange={handleInputTextChange} type="text"/>
    {/* <div
        className="dropzone"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        >
        Drop files here
    </div> */}
    <input type="file" multiple webkitdirectory="" onChange={handleInputChange} />
    {   
      files.map((file, index) => (
      <div key={index}> {file.name}
        <button onClick={() => handleRemove(index)}>Remove</button>
      </div>
        ))
    }
      
    {
      (
      <div>
        {files.length} Files are uploaded
      </div>
      )
    }
     <div>

<label>

 Access:

  <select value={value} onChange={handleChange}>

    <option value="1">Public</option>

    <option value="0">Private</option>

  </select>

</label>

<p>We eat {value}!</p>

</div>
      <button onClick={handleFileSelect}>Upload</button>
  </>
  );
};
export default FileUploader;