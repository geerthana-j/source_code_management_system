import React,{useState,useHistory} from 'react';
import { useNavigate } from 'react-router-dom';
function UserRegister(){
    const [userCredentials,setUserCredentials]=useState({mail:"",pass:"",cpass:""});
    const [message, setMessage] = useState('');

   // const history = useHistory();
   const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const jsonData=JSON.stringify(userCredentials);
        try{
          const response =  await fetch("http://localhost:8003/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: jsonData
          });
          const data = await response.json();
          console.log(data.result);
          if(data.result==1){
            setMessage('User Already Registered');
          }
          else if(data.result==1){
            setMessage('Successfully Registered');
          }
          else{
            setMessage("Password Mismatched");
          }
          await window.alert(message);
          navigate(-1);
        }
        catch (error) {
          console.error(error);
        }
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
          <div>
          <p>Signup Form</p>
          <label  htmlFor="mail"> Enter your email address</label>
          <input name="mail" value={userCredentials.mail} onChange={handleChange}  type="text"/>
          <label htmlFor="pass">Enter the Password</label>
          <input name="pass" value={userCredentials.pass} onChange={handleChange}  type="password"/>
          <label htmlFor="cpass"> Enter your Confirm Password</label>
          <input name="cpass" value={userCredentials.cpass} onChange={handleChange}  type="password"/> 
          <button type="submit"> Register </button>
          </div>
          </form>
          
                </>
          )
}
export default UserRegister;