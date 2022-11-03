import { Box, Button, TextField } from "@mui/material";

import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
 import { Formik } from 'formik';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import axios from "axios";
// import "./reg.css" 
// // import { Button, TextField } from '@mui/material';
// import { LockClosedIcon } from '@heroicons/react/20/solid'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee, faTag } from "@fortawesome/fontawesome-free-solid"; 


  const Loginform = () => {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [data,setData]=useState();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(()=>{
  if(password)
      logIn()
  

      Axios.get("https://violet-kangaroo-suit.cyclic.app/api-users/users/",{email,password}).then((res) => {
       setData(res.data)
  })
  
  },[password]);
  
  

  
  const logIn = () => {
   
    Axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/login",{email,password}).then((res) => {
      if(res.data.status=="logged")
      {
       
        localStorage.setItem("logged", res.data.user._id);
       
        
      }
  alert(res.data.status)
  window.location.reload(false)
    });
  }




  const phoneRegExp =
  /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  password: yup.string().required("required"),
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



function sets(email,password)
{
  // e.preventDefault();
 
  setEmail(email)
  setPassword(password)


 
}





  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
 
  };

  return (
    <Box m="20px">
      <Header title="LOG IN2" />

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
             ></TextField>
          
           
            </Box>
             
            <Box display="flex" justifyContent="space-between"  mt="20px">
            <Box mt=""><Link style={{color:`${colors.grey[100]}`, fontSize:"15px"}} to="/register" > dont have an account yet?</Link></Box>   
              <Button type="button" color="secondary" variant="contained"  onClick={()=>{sets(values.email,values.password)}} >
                Log in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



export default Loginform;

// //














 
