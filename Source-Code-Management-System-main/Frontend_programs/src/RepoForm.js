/*import React, {useState} from "react";
function RepoForm(){
    const [fileList, setSelectedFolder] = useState();
   function handleFolderSelect(event) {
//    console.log(event.target.files[0]);
//    console.log(JSON.stringify(ev);
//    const arr=[]//new Array(event.target.files.length);
//    for(let i of event.target.files){
//         arr.push(i);
//    }
//    setSelectedFolder(arr);
 setSelectedFolder(event.target.files);
  //  console.log(selectedFolder);
  }

async function handleSubmit(event) {
    event.preventDefault();
    console.log(fileList);
    for(let j of fileList){
        console.log(j);
    }

  //  const formData = new FormData();
    // for (let i = 0; i < this.state.files.length; i++) {
    //   formData.append("files[]", this.state.files[i]);
    // }
    // await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = new FormData();
    // files.forEach((file, i) => {
    //   data.append(`file-${i}`, file, file.name);
    // });

    // const formData = new FormData();
    // formData.append('name','karthick');
    // formData.append('folder', selectedFolder);
    //console.log(Object.fromEntries(formData));
    //const formDataObj = {};
    // formData.forEach((value, key) => (formDataObj[key] = value));
const formData = new FormData();
for (let i = 0; i < fileList.length; i++) {
  formData.append("files[]", fileList[i]);
}

    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ '(-->' + pair[1]);
    //     for( let oj of pair[1]){
    //         console.log(oj);
    //     }

    
    //}
//   console.log(fileList[0]);
    await fetch('http://localhost:8003/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    // send the selected folder to the server
  }
  const files = fileList ? [...fileList] : [];
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="folderToUpload" directory="" webkitdirectory="" onChange={handleFolderSelect} />
      <button type="submit">Upload Folder</button>
    </form>
  );
}

 export default RepoForm;
// import { ChangeEvent, useState } from 'react';

// function RepoForm() {
//   const [fileList, setFileList] = useState<FileList|null>(null);

//   const handleFileChange = (e) => {
//     setFileList(e.target.files);
//   };

//   const handleUploadClick = () => {
//     if (!fileList) {
//       return;
//     }

//     // 👇 Create new FormData object and append files
//     const data = new FormData();
//     files.forEach((file, i) => {
//       data.append(`file-${i}`, file, file.name);
//     });

//     // 👇 Uploading the files using the fetch API to the server
//     fetch('https://httpbin.org/post', {
//       method: 'POST',
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.error(err));
//   };

//   // 👇 files is not an array, but it's iterable, spread to get an array of files
//   const files = fileList ? [...fileList] : [];

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} multiple />

//       <ul>
//         {files.map((file, i) => (
//           <li key={i}>
//             {file.name} - {file.type}
//           </li>
//         ))}
//       </ul>

//       <button onClick={handleUploadClick}>Upload</button>
//     </div>
//   );
// }

// export default RepoForm; */