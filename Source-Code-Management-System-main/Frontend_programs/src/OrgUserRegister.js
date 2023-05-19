import React,{useState} from 'react';
function OrgUserRegister(){
    const [userCredentials,setUserCredentials]=useState({domain:"",mail:"",pass:"",cpass:""});
    function handleSubmit(e){
        e.preventDefault();
        const jsonData=JSON.stringify(userCredentials);
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
          })
          .catch(error => {
            console.error("Fetch error:", error);
          });
        
    }
    function handleChange(e){

        const nextFormState = {
            ...userCredentials,
            [e.target.name]: e.target.value,
          };
        //  console.log(nextFormState);
          setUserCredentials(nextFormState);
      
    }
        return(<>
               <form onSubmit={handleSubmit}> 
                <label htmlFor="domain">Enter your domain name</label>
                <input name="domain" value={userCredentials.domain} onChange={handleChange}  type="text"/>
                <div>
                <p>Enter the Administrator details</p>
                <label  htmlFor="mail"> Enter your email address</label>
                <input name="mail" value={userCredentials.mail} onChange={handleChange}  type="email"/>
                <label htmlFor="pass">Enter the Password</label>
                <input name="pass" value={userCredentials.pass} onChange={handleChange}  type="password"/>
                <label for="cpass"> Enter your Confirm Password</label>
                <input name="cpass" value={userCredentials.cpass} onChange={handleChange}  type="password"/> 
                <button type="submit"> Register </button>
                </div>
               </form>
                </>
            )
}
export default OrgUserRegister;