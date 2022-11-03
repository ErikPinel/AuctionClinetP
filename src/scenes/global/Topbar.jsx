import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Link } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";



const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const[isNotification,setIsNotification]=useState(false);
  useEffect(() => {

    localStorage.getItem("logged") ?findUser( localStorage.getItem("logged")): localStorage.getItem("logged");
    },[])

  
    async function findUser(userID) {
    
      await axios.get(`http://localhost:5000/api-users/users/${userID}`).then((res) => {
        console.log("topbar")
        let obj = {
          isSoled: res.data[0].isSoled , 
          isBought: res.data[0].isBought
        };
        if(obj.isSoled&&obj.isBought)
        setIsNotification(true)
  
      });}



  function removeNotification()
 {
  let userID=localStorage.getItem("logged");
  
  axios.patch(`http://localhost:5000/api-users/users/removeIsBought/${userID}`).then((res) => {
   
    setIsNotification(false)

  });
 

 }
  

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
            {isNotification? <IconButton>
        <Link   to='/displayItemBoughtAndSoled'> <NotificationsActiveIcon onClick={()=>removeNotification()} style={{"color":"red"}}  /></Link> 
        </IconButton>:
        
        <IconButton>
       <NotificationsOutlinedIcon  />
        </IconButton>
        }
        
        { localStorage.getItem("logged")?    <IconButton onClick={()=>{localStorage.removeItem("logged");window.location.reload(false)}} >
                  <Logout  />
                </IconButton>
          
              
: ""
        }

        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;
