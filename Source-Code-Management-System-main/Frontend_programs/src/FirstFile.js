import React, { useState } from "react";
import SeocndFile from "./SeocndFile";

function FirstFile() {
  const [showSecondFile, setShowSecondFile] = useState(false);
  const handleClick = () => {
    setShowSecondFile(true);
    };
  return (
    <div>
      <button onClick={handleClick}>Show Second File</button>
      {showSecondFile && <SeocndFile />}
    </div>
  );
}

export default FirstFile;