import React, { useState } from "react";

const DragAndDrop = () => {
  const [files, setFiles] = useState([]);

  // const handleDrop = (e) => {
  //   e.preventDefault();

  //   const droppedFiles = [];
  //   const items = e.dataTransfer.items;

  //   for (let i = 0; i < items.length; i++) {
  //     const entry = items[i].webkitGetAsEntry();
  //     if (entry.isFile) {
  //       entry.file((file) => {
  //         droppedFiles.push(file);
  //       });
  //     } else if (entry.isDirectory) {
  //       traverseFileTree(entry, (file) => {
  //         droppedFiles.push(file);
  //       });
  //     }
  //   }
  //   console.log(droppedFiles);
  //   setFiles(droppedFiles);
  // };

  // const traverseFileTree = (item, callback) => {
  //   item.createReader().readEntries((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isFile) {
  //         entry.file((file) => {
  //           callback(file);
  //         });
  //       } else if (entry.isDirectory) {
  //          traverseFileTree(entry, callback);
  //       }
  //     });
  //   });
  // };
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
             // console.log('file')
             // console.log(file);
             // console.log('path '+path);
              // Build the relative path by appending the current directory path to the file name
             //  const relativePath = currentDirectoryPath + "/" + item.name + "/" + file.name;
               const newFile = new File([file], file.name, { type: file.type, lastModified: file.lastModified });
               Object.defineProperty(newFile, "webkitRelativePath", {
                 value: path,
                 writable: false,
               });
              console.log(newFile);
              newFiles.push(newFile);
              setFiles(newFiles);
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
            setFiles(newFiles);
          });
        } else if (entry.isDirectory) {
          traverseFolder([entry]);
        }
      }
     // console.log(newFiles);
      setFiles(newFiles);
      console.log(files);
    };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ width: "200px", height: "200px", border: "1px solid black" }}
    >
      Drop files here
      {files.map((file, index) => (
        <div key={index}>
          {file.name}
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
