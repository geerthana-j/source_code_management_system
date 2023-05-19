import React,{useState} from 'react';
import "./UserLogin.css"
import { useNavigate } from 'react-router-dom';
function UserLogin(){
    const [userCredentials,setUserCredentials]=useState({mail:"",pass:""});
  //  const [loginResult,setLoginResult]=useState(0);
    var loginResult=0;
    const navigate=useNavigate();
    async function handleSubmit(e){
      localStorage.setItem('user',JSON.stringify(userCredentials));
        e.preventDefault();
        const jsonData=JSON.stringify(userCredentials);
        try {
          const response =  await fetch("http://localhost:8003/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: jsonData
          });
          const data = await response.json();
          console.log(data);
          if(data.result==2){
            navigate('/userhome');
          }
          else{
            if(data.result==1){
              await window.alert('Incorrect Password')
            }
            else{
              await window.alert('User is not registered');
            }
            navigate(-1);
          }
         // await setLoginResult(data.result);
        }
        catch (error) {
          console.error(error);
        }
        console.log(loginResult);
        
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
               <form className="userlogin" onSubmit={handleSubmit}> 
                <div> 
                <p>User Login Page</p>
                <label className="label1" htmlFor="mail"> Enter your email address</label>
                <input className="input1" name="mail" value={userCredentials.mail} onChange={handleChange}  type="text"/>
                <label className="label1" htmlFor="pass">Enter the Password</label>
                <input className="label2" name="pass" value={userCredentials.pass} onChange={handleChange}  type="password"/>
                </div>
                <button className="button1" type="submit"> Login </button>
               </form>
                </>
            )
}
export default UserLogin;