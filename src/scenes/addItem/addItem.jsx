

import axios  from 'axios';
import "./addItem.css"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Button, NativeSelect, Select, TextField } from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { MenuItem } from 'react-pro-sidebar';


const schema = yup.object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  }).required();

 function AddItem1 () {
const [title,setTitle]=useState();
const [dueDate,setDueDate]=useState();
const [description,setDescription]=useState();
const [SellerID,setSellerID]=useState();
const [offers,setOffers]=useState([0]);
const [section,setSection]=useState("Men-section");
const [price,setPrice]=useState(0);
const [data,setData]=useState();
const [image,setImage]=useState();
const [imageURL,setImageURL]=useState();
const [fileVisit,setFileVisit]=useState("no-visit");
const [isTitle,setIsTitle]=useState(false);
const [isPrice,setIsPrice]=useState(false);
const [isDescription,setIsDescription]=useState(false);
const [isAuctionDays,setisAuctionDays]=useState(false);



const initialValues = {
  Title: "",
  price: "",
  description: "",
  auctionDays: "",
  
};
const renderError = (message) => <p className="help is-danger">{message}</p>;







useEffect(()=>{



      
        setSellerID(localStorage.getItem("logged"))

  if(image)
  uploadImage();
  },[image]);



const postItem = (event) => {
    const currentBid=price;
    const bidderID=localStorage.getItem("logged")
    

    // const myDate = (new Date(new Date().getTime()+(dueDate*24*60*60*1000))).getTime();
    let myDate=new Date().getTime()
    // myDate.setSeconds(myDate.getSeconds() + 15)
    // myDate=myDate.getTime()
    let obj = { title: title, dueDate: myDate,description:description,SellerID:SellerID,offers:[{currentBid:Number(currentBid),bidderID}],image:imageURL,section:section } ;
    
    if(section== "Men-section")
    {
    axios
      .post("/https://violet-kangaroo-suit.cyclic.app/api-itemMen/itemmen", obj)
     
    }
   else if(section=="Women-section")
    {
      

    axios
      .post("/https://violet-kangaroo-suit.cyclic.app/api-itemWomen/itemwomem/", obj)
    }
  else if(section=="Kids-section")
    {
    axios
      .post("/https://violet-kangaroo-suit.cyclic.app/api-itemKids/itemkids", obj)
    }
    else alert("fill all fields")


  };

 const uploadImage=()=>{
    const formData=new FormData()
    formData.append('file',image)
    formData.append('upload_preset','hztpszww')
    Axios.post("https://api.cloudinary.com/v1_1/djz5ywj1e/image/upload",formData)
    .then((response)=>setImageURL(response.data.secure_url))
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0])
    { 
      setImage(event.target.files[0]);
      uploadImage();
    }
      else alert("not a valid image")
    
  }
  
  function handleTitle(e)
{
  setTitle(e.target.value)
  setIsTitle(false)
}

function handleDays(e)
{
  
  setDueDate(e.target.value)
  setisAuctionDays(false)
}


function handleDescription(e)
{
  
  setDescription(e.target.value)
  setIsDescription(false)
}

function handlePriceInput(e)
{
  
  setPrice(e.target.value)
  setIsPrice(false)
}


  return(
   <div className='add-page-container'>
    <h1> add new item you want to sell</h1>
  <hr></hr>
    <div className='inputs-container'>
    
   
<div className='title-container'>
    <span className='input-span'>
    <div className='input-title'> section</div>
    
    </span>
    <span className='input-span'>
    <div className={`input-title`}> pick image</div> <input  className={ `file-input  ${fileVisit}`} type="file"  onChange={(event)=>{setImage(event.target.files[0]); setTimeout(setFileVisit('file-visted'),100)}}></input>
    </span>
    </div>
    <div class="parent">
  
<div class="div1">    <TextField className='add-inputs' label="Title" variant="standard" onChange={(e)=>
  {(e.target.value.length<20)?(e.target.value.length>8)?
  handleTitle(e): setIsTitle(true): setIsTitle(true) }} />
  {isTitle?<div style={{"display":'block'}}>please enter a valid title(8-20 words)</div>:<div style={{"display":'none'}}>please enter valid title(8-20)</div>}

 </div>
<div class="div2">    <TextField className='add-inputs' label="auction duration(days)" variant="standard"  onChange={(e)=>
    {(e.target.value<30)?(e.target.value>0)?
      handleDays(e): setisAuctionDays(true):setisAuctionDays(true) }} />
      {isAuctionDays?<div style={{"display":'block'}}>please enter a valid time line (1-30 days)</div>:""}
    
    
 </div>
<div class="div3">    <TextField className='add-inputs' label="Description" variant="standard" onChange={(e)=>
  
  {(e.target.value.length<30)?(e.target.value.length>8)?
    handleDescription(e): setIsDescription(true):setIsDescription(true) }} />
    {isDescription?<div tyle={{"displasy":'block'}}>please enter a valid description(8-30 words)</div>:""}
 </div>
<div class="div4">    <TextField className='add-inputs' label="starting price" variant="standard" onChange={(e)=>
  {(e.target.value<999999)?e.target.value>4?
    handlePriceInput(e): setIsPrice(true):setIsPrice(true) }} />
    {isPrice?<div style={{"display":'block'}}>please enter a valid price (5-999999 $)</div>:<div style={{"display":'none'}}>please enter valid time line(1-30)</div>}
 </div>
<div class="div5">   <Button variant="contained" onClick={()=>{if(section&&!isTitle&&!isAuctionDays&&!isDescription&&!isPrice&&image){postItem(); alert("your item was added to the section") } else alert("enter all fields")}}> submit</Button>
</div>
</div>



</div>
   </div>
  )
 }
 







 ///







  const AddItem = () => {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();
  const [phone,setPhone]=useState();
  const [counterPost,setCounterPost]=useState(0);
  const [title,setTitle]=useState();
  const [dueDate,setDueDate]=useState();
  const [description,setDescription]=useState();
  const [SellerID,setSellerID]=useState();
  const [offers,setOffers]=useState([0]);
  const [section,setSection]=useState("Men-section");
  const [price,setPrice]=useState(0);
  const [data,setData]=useState();
  const [image,setImage]=useState();
  const [imageURL,setImageURL]=useState();
  const [fileVisit,setFileVisit]=useState("no-visit");
  const [isTitle,setIsTitle]=useState(false);
  const [isPrice,setIsPrice]=useState(false);
  const [isDescription,setIsDescription]=useState(false);
  const [isAuctionDays,setisAuctionDays]=useState(false);
  const [isFile,setIsFile]=useState(false);


  useEffect(()=>{
    


    if(counterPost!=0)
    uploadImage();
    else setSellerID(localStorage.getItem("logged"))
    
    },[counterPost]);



    useEffect(()=>{
if(imageURL)
postItem()
},[imageURL]);



const postItem = (event) => {
  const currentBid=price;
  const bidderID=localStorage.getItem("logged")
 

  const myDate = (new Date(new Date().getTime()+(dueDate*24*60*60*1000))).getTime();
  let obj = { title: title, dueDate: myDate,description:description,SellerID:SellerID,offers:[{currentBid:Number(currentBid),bidderID}],image:imageURL,section:section } ;
  
  if(section== "Men-section")
  {
  axios
    .post("https://violet-kangaroo-suit.cyclic.app/api-itemMen/itemmen", obj)
    .then((res) => alert(res.data.status)).then(window.location.reload(false))
   
  }
 else if(section=="Women-section")
  {
    

  axios
    .post("https://violet-kangaroo-suit.cyclic.app/api-itemWomen/itemwomem/", obj)
    .then((res) => alert(res.data.status)).then(window.location.reload(false))
  }
else if(section=="Kids-section")
  {
  axios
    .post("https://violet-kangaroo-suit.cyclic.app/api-itemKids/itemkids", obj)
    .then((res) => alert(res.data.status)).then(window.location.reload(false))
  }
  else alert("fill all fields")

  setTitle()
  setDueDate()
  setPrice()
  setDescription()
  setCounterPost(0)
  setImageURL(0)

};
const uploadImage=()=>{
  const formData=new FormData()
  formData.append('file',image)
  formData.append('upload_preset','hztpszww')
  Axios.post("https://api.cloudinary.com/v1_1/djz5ywj1e/image/upload",formData)
  .then((response)=>setImageURL(response.data.secure_url))
}

const onImageChange = (event) => {
  if (event.target.files && event.target.files[0])
  { 
    setImage(event.target.files[0]);
    uploadImage();
  }
    else alert("not a valid image")
  
}

function handleTitle(e)
{
setTitle(e.target.value)
setIsTitle(false)
}

function handleDays(e)
{
setDueDate(e.target.value)
setisAuctionDays(false)
}


function handleDescription(e)
{
setDescription(e.target.value)
setIsDescription(false)
}

function handlePriceInput(e)
{
setPrice(e.target.value)
setIsPrice(false)
}






  const phoneRegExp =
  /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().min(8).required("required"),
  price: yup.number().min(5).max(999999).required("required"),
  dueDate: yup.number().min(1).max(30).required("required")
});
const initialValues = {
  title: "",
  description: "",
  price: "",
  dueDate:""
  
};



function sets(title,dueDate,price,description)
{
  // e.preventDefault();
 
  setTitle(title)
  setDueDate(dueDate)
  setPrice(price)
  setDescription(description)
  setCounterPost(counterPost+1)
 
}




  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    
  };

  return (
    <Box m="20px">
      <Header title="POST YOUR ITEM" subtitle="Post a new Item" />

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
  


  <NativeSelect
    defaultValue={section}
    onChange={(e)=>setSection(e.target.value)}
    sx={{ gridColumn: "span 2" }}>

    <option value={"Men-section"}>Men-section</option>
    <option value={"Women-section"}>Women-section</option>
    <option value={"Kids-section"}>Kids-section</option>
  </NativeSelect>
  

            
                
  <Button
  variant="contained"
  component="label"
    
  sx={{ gridColumn: "span 1" ,background:"blue"}}>

  Upload File
  <input
    type="file"
    hidden
    onChange={(event)=>{setIsFile(true);setImage(event.target.files[0])}}
    
    
  />
</Button>
{isFile? "Uploaded":""}



              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
               onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
               
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Due Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dueDate}
                name="dueDate"
                error={!!touched.dueDate && !!errors.dueDate}
                helperText={touched.dueDate && errors.dueDate}
                sx={{ gridColumn: "span 4" }}
              />
           
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">

              <Button type="button" color="secondary" variant="contained"  onClick={()=>{if(values.title&&values.dueDate&&values.price&&values.description&&image)sets(values.title,values.dueDate,values.price,values.description);else alert("enter all fields")}} >
                Post an item
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {email}
    </Box>
  );
};



export default  AddItem;
