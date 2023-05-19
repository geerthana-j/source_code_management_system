// import React, { useState , useEffect} from "react";
// import "./Login.css";
// export default function Login() {
//   const [state, setState] = useState({
//     email: "",
//     password: ""
//   });
//   const [message, setMessage] = useState({});
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setState((prevProps) => ({...prevProps, [name]: value }));
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault(); 
//     console.log(state);
//     useEffect(() => {
//       fetch("http://localhost:8000/")
//         .then((res) => res.json())
//         .then((data) => setMessage(data));
//     }, []);
//   };
//   return (
//     <><h1>Source Code Management System </h1><div className="App">
//       <form onSubmit={handleSubmit}>
//         <div className="form-control">
//           <label>Email address</label>
//           <input
//             type="text"
//             name="email"
//             value={state.email}
//             onChange={handleInputChange} />
//         </div>
//         <div className="form-control">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={state.password}
//             onChange={handleInputChange} />
//         </div>
//         <div className="form-control">
//           <label></label>
//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </div></>
//   );
// }
