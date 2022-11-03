import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import PieChartTotalSold from "../../components/PieChartTotalSold";




const PieSoled = () => {
  const [postsPie,setPostsPie]=useState([])
  useEffect(()=>{
    const fetchPostsCurrent=  ()=>{
       //"status":"sucsses","revanue":totalRevanue(data.itemsBought),"TotalItemsSoled":data.itemsBought.length})
       axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/Soled",{id:localStorage.getItem("logged")}).then((res) => {
        console.log(res.data)
        if( res.data)
        {
          setPostsPie(res.data.revanue);
       
          // setTotal(res.data.revanue.revanueMen+ res.data.revanue.revanueWomen +  res.data.revanue.revanueKids)
          localStorage.setItem("totalRevanue",res.data.revanue[0].value+res.data.revanue[1].value+res.data.revanue[2].value)
        }  

            })
    }
    fetchPostsCurrent()
  },[])





  return (
    <Box m="20px">
      <Header  subtitle= {`Total Revanue ${localStorage.getItem("totalRevanue")} $` }></Header>
      <Box height="75vh">
        <PieChartTotalSold postsPie={postsPie} />
      </Box>
    </Box>
  );
};

export default PieSoled;
