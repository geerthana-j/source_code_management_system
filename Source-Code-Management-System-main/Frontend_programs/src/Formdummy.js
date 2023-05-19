import React, {useState} from "react";
function Formdummy(){
    const [fileList, setSelectedFolder] = useState();
   function handleFolderSelect(event) {
        setSelectedFolder(event.target.files);
    }
function fileListToJSON(fileList, callback) {
    let filesArray = [];
    let loadedCount = 0;
  
    function handleFileLoad(file, fileReader) {
      if (file.type.includes("text")) {
        fileReader.readAsText(file);
        fileReader.onload = function() {
          let fileObject = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            content: fileReader.result
          };
          filesArray.push(fileObject);
          loadedCount++;
          if (loadedCount === fileList.length) {
            const jsonData = JSON.stringify(filesArray);
            fetch("http://localhost:8003/upload", {
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
            lastModified: file.lastModified,
            content: fileReader.result
          };
          filesArray.push(fileObject);
          loadedCount++;
  
          if (loadedCount === fileList.length) {
            const jsonData = JSON.stringify(filesArray);
            fetch("http://localhost:8003/upload", {
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
      } else {
        // Handle other types of files here
        console.log("Unsupported file type: " + file.type);
        loadedCount++;
  
        if (loadedCount === fileList.length) {
          const jsonData = JSON.stringify(filesArray);
          fetch("http://localhost:8003/upload", {
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
      }
}
    for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i];
        let fileReader = new FileReader();

        handleFileLoad(file, fileReader);
    }
}
  
function handleSubmit(event) {
    event.preventDefault();
    console.log(fileList);
  
    for(let j of fileList){
        console.log("name "+ j.name);
    }
    fileListToJSON(fileList, function(json) {
        console.log(json);
      });
}
  return (
    <form onSubmit={handleSubmit}>
        
        <input type="text" />
        <input type="file" name="folderToUpload" directory="" webkitdirectory="" onChange={handleFolderSelect} />
      <button type="submit">Upload Folder</button>
    </form>
  );
}
export default Formdummy;
