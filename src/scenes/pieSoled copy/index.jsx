import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import PieChartTotalSpent from "../../components/PieChartTotalSpent";




const PieSpent = () => {
  const [postsPie,setPostsPie]=useState([])
  useEffect(()=>{
    const fetchPostsCurrent= async ()=>{
       //"status":"sucsses","revanue":totalRevanue(data.itemsBought),"TotalItemsSoled":data.itemsBought.length})
      await axios.post("http://localhost:5000/api-users/users/Bought",{id:localStorage.getItem("logged")}).then((res) => {
        console.log(res.data)
        if( res.data)
        {
          setPostsPie(res.data.revanue);
       
          // setTotal(res.data.revanue.revanueMen+ res.data.revanue.revanueWomen +  res.data.revanue.revanueKids)
          localStorage.setItem("totalSpent",res.data.revanue[0].value+res.data.revanue[1].value+res.data.revanue[2].value)
        }  

            })
    }
    fetchPostsCurrent()
  },[])





  return (
    <Box m="20px">
      <Header  subtitle= {`Total Revanue ${localStorage.getItem("totalSpent")} $` }></Header>
      <Box height="75vh">
        <PieChartTotalSpent postsPie={postsPie} />
      </Box>
    </Box>
  );
};

export default PieSpent;
