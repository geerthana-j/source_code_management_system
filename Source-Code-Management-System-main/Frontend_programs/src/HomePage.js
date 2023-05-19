import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import UserHomeProject from './UserHomeProject';
import OrgLogin from './OrgLogin';
import UserLogin from './UserLogin';
import OrgUserRegister from './OrgUserRegister'
import UserRegister from './UserRegister';
import './HomePage.css';
function HomePage(val){
        const navigate=useNavigate();
        useEffect(() => {
            const handleButton1Click = () => {
              navigate('/orgUserlogin');
            };
            
            const handleButton2Click = () => {
              navigate('/login');
            };
            
            const handleButton3Click = () => {
              navigate('/orgUserReg');
            };
            
            const handleButton4Click = () => {
              navigate('/userReg');
            };
            
            const buttons = document.querySelectorAll('button');
            buttons.forEach((button) => {
              if (button.className === 'orgUserLogin') {
                button.addEventListener('click', handleButton1Click);
              } else if (button.className === 'login') {
                button.addEventListener('click', handleButton2Click);
              } else if (button.className === 'orgUserReg') {
                button.addEventListener('click', handleButton3Click);
              } else if (button.className === 'userReg') {
                button.addEventListener('click', handleButton4Click);
              }
            });
            
            return () => {
              buttons.forEach((button) => {
                if (button.className === 'orgUserLogin') {
                  button.removeEventListener('click', handleButton1Click);
                } else if (button.className === 'login') {
                  button.removeEventListener('click', handleButton2Click);
                } else if (button.className === 'orgUserReg') {
                  button.removeEventListener('click', handleButton3Click);
                } else if (button.className === 'userReg') {
                  button.removeEventListener('click', handleButton4Click);
                }
              });
            };
          }, [navigate]);
        // const handleButtonClick = (page) => {
        //     if(page=='1'){
        //         navigate('/org_login');
        //     }
        //     else if(page=='2'){
        //         navigate('/login');
        //     }
        //     else if(page=='3'){
        //         navigate('/org_register');
        //     }
        //     else {
        //         navigate('/register');
        //     }
        // }
    //   };    
    // const[componentCall,setComponentCall]=useState({a:false,b:false,c:false,d:false});
    // function handleComponent(val){
    //     const tempcomponentCall={a:false,b:false,c:false,d:false};
    //     if(val==='a'){
    //         tempcomponentCall['a']=true;
    //         tempcomponentCall['b']=false;
    //         tempcomponentCall['c']=false;
    //         tempcomponentCall['d']=false;
    //     }
    //     if(val==='b'){

    //     }
    // }
    return (
        <>
        {/* <button onClick={handleComponent('a')}>Organisation User Login</button>
        <button onClick={handleComponent('b')}> User Login</button>
        <button onClick={handleComponent('a')}>Organisation User Register</button>
        <button onClick={handleComponent('a')}>User Register </button>  */}
        {/* <button onClick={handleComponent('a')}>Organisation User Login</button>
        <button onClick={handleComponent('b')}> User Login</button>
        <button onClick={handleComponent('a')}>Organisation User Register</button>
        <button onClick={handleComponent('a')}>User Register </button> */}
         {/* <Router>
           <div className="App">
            <ul className="App-header">
                <Link to="/org_login"><button>Organisational User Login</button></Link>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/org_resgister"><button>Organisational User Register</button></Link>
                <Link to="/register"><button>User Register</button></Link>
             
            </ul>
                <Routes>
                 <Route exact path='/org_login' element={< OrgLogin />}></Route>
                 <Route exact path='/login' element={< UserLogin />}></Route>
                 <Route exact path='/org_resgister' element={<OrgUserRegister/>}></Route>
                 <Route exact path='/register' element={<UserRegister/>}></Route>
                </Routes>
          </div>
       </Router> */}
            {/* <button className="orgUserLogin" onClick={handleButtonClick('1')}>Organisational User Login</button>
            <button className="login" onClick={handleButtonClick('2')}>Login</button>
            <button className="orgUserReg" onClick={handleButtonClick('3')}>Organisational User Register</button>
            <button className="userReg" onClick={handleButtonClick('4')}>User Register</button> */}
            {/* <button className="orgUserLogin" >Organisational User Login</button> */}
            <p>Source code controlling system</p>
            <button id="loginBtn" className="login" >Login</button>
            {/* <button className="orgUserReg" >Organisational User Register</button> */}
            <button id="userRegBtn" className="userReg">User Register</button>
  

             {/* <Routes>
                  <Route exact path='/org_login' element={< OrgLogin />}></Route>
                  <Route exact path='/login' element={< UserLogin />}></Route>
                  <Route exact path='/org_resgister' element={<OrgUserRegister/>}></Route>
                  <Route exact path='/register' element={<UserRegister/>}></Route>
             </Routes>  */}
        </>
    )
}
export default HomePage;
