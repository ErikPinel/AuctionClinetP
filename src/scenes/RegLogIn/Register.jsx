import { Box, Button, TextField } from "@mui/material";

import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
 import { Formik } from 'formik';
import Axios from 'axios';
import { Link } from "react-router-dom";
// import "./reg.css" 
// // import { Button, TextField } from '@mui/material';
// import { LockClosedIcon } from '@heroicons/react/20/solid'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee, faTag } from "@fortawesome/fontawesome-free-solid"; 


  const Form = () => {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();
  const [phone,setPhone]=useState();
  const [counterPost,setCounterPost]=useState(0);



  useEffect(()=>{
    if(counterPost!=0)
    postUser()
    
    
    },[counterPost]);

  const phoneRegExp =
  /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  password: yup.string().min(8).required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),

});
const initialValues = {
  firstName: "",
  password: "",
  email: "",
  contact: "",
  
};



function sets(email,fullName,phone,password,e)
{
  // e.preventDefault();
 
  setEmail(email)
  setPassword(password)
  setFullName(fullName)
  setPhone(phone)
  setCounterPost(counterPost+1)
 
}


  function setUseProxies(data)
{
localStorage.setItem("logged",data);
alert("logged")
}

const postUser = () => {
  console.log("email")
  console.log(email)
  let obj = { email: email, password:password,fullName:fullName,phone:phone} 
  // Axios
  // .get("http://localhost:5000/api-users/users/").then(res=>console.log("sdsd"))
  Axios
    .post("http://localhost:5000/api-users/users/register", obj)
    .then((res) => res.data=="email alredy exist"?alert("email alredy exist try to log in insted"+ res.data): setUseProxies(res.data))
}


  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    postUser()
  };

  return (
    <Box m="20px">
      <Header title="REGISTER" subtitle="Create a New User Profile" />

      <Formik

        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
               onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 4" }}
               
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
           
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Box mt=""><Link style={{color:"white", fontSize:"20"}} to="/logIn" >have an account alredy?</Link></Box>   

              <Button type="button" color="secondary" variant="contained"  onClick={()=>sets(values.email,values.fullName,values.phone,values.password)} >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {email}
    </Box>
  );
};



export default Form;

// //






//  export  function RegisterForm() {
//   const [email,setEmail]=useState();
//   const [password,setPassword]=useState();
//   const [fullName,setFullName]=useState();
//   const [phone,setPhone]=useState();
//   const [data,setData]=useState();


// useEffect(()=>{

//       axios.get("/api-users/users").then((res) => {
//       setData(res.data);
//       console.log(data)
//           })
  


// },[]);

// function setUseProxies(data)
// {
// localStorage.setItem("logged",data);
// alert("logged")
// }

// const postUser = () => {
//   let obj = { email: email, password: password,fullName:fullName,phone:phone} 
//   axios
//     .post("/api-users/users/register", obj)
//     .then((res) => res.data=="email alredy exist"?alert("email alredy exist try to log in insted"+ res.data): setUseProxies(res.data))
// }


//   return (
//     <>
 
//       <div className="flex min-h-full items-center justify-center py-12 px-4 xl:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8">
//           <div>
//           <FontAwesomeIcon icon="fa-tag" className='tag-icon' />
//             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
//               Sign in to your account
//             </h2>
            
//           </div>
//           <form className="mt-8 space-y-6"  >
//             <input type="hidden" name="remember" defaultValue="true" />
//             <div className="-space-y-px rounded-md shadow-sm">
//               <div>
//                 <label htmlFor="fullName" className="sr-only">
//                   Full name
//                 </label>
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="string"
//                   required
//                   className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Full name"
//                   onChange={(e)=>setFullName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="email"
//                   onChange={(e)=>setEmail(e.target.value)}
//                 />
//               </div>


//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Password"
//                   onChange={(e)=>setPassword(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phoneNumber" className="sr-only">
//                 Phone number
//                 </label>
//                 <input
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   type="number"
//                   required
//                   className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Phone number"
//                   onChange={(e)=>setPhone(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <button
             
//                 onClick={postUser}
//                 className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//               >
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
//                   <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
//                 </span>
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }