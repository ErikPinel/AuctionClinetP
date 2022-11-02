import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import PieSoled from "../pieSoled"; 
import PieChartTotalSold from "../../components/PieChartTotalSold";
// import PieSpent from "../pieSpent";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';





const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalRevenue,setTotalRevenue]=useState(0)
  const [totalBids,setTotalBids]=useState(0)
  const [totalSales,setTotalSales]=useState(0)
  const [totalBuys,setTotalBuys]=useState(0)
  const [postsPieSpent,setPostsPieSpent]=useState([])
  const [postsPiSoled,setPostsPiSoled]=useState([])


  useEffect( ()=>{
    const fetchPostsCurrent= async ()=>{
       
        await axios.post("https://violet-kangaroo-suit.cyclic.app/api-currentHistory/chart",{id:localStorage.getItem("logged")}).then((res) => {
          setTotalRevenue(res.data.total);

            })

            await  axios.post("https://violet-kangaroo-suit.cyclic.app/api-currentHistory/totalBids",{id:localStorage.getItem("logged")}).then((res) => {
              setTotalBids(res.data.total);
    
                })

                await  axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/Bought",{id:localStorage.getItem("logged")}).then((res) => {
                  setTotalBuys(res.data?res.data.TotalItemsBought:0)
                  setPostsPieSpent(res.data.revanue)
                    })


                    await  axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/Soled",{id:localStorage.getItem("logged")}).then((res) => {
                      setTotalSales(res.data?res.data.TotalItemsSoled:0);
                      setPostsPiSoled(res.data.revanue)
            
                        })
    




    }
    localStorage.getItem("logged")? fetchPostsCurrent() : localStorage.getItem("logged");
   
  },[])

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {window.outerWidth<=600?  
          <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalRevenue+"$"}
            subtitle="Projected Earnings"
            progress="0.75"
            increase="+14%"
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        :
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalRevenue+"$"}
            subtitle="Projected Earnings"
            progress="0.75"
            increase="+14%"
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        }






      {window.outerWidth<=600?    <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalBids}
            subtitle="My bidds currently"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>:
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalBids}
            subtitle="My bidds currently"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
         }



       {window.outerWidth<=600?  <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalSales}
            subtitle="Total items solled so far"
            progress="0.30"
            increase="+5%"
            icon={
              <SellIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        :
        <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={totalSales}
          subtitle="Total items solled so far"
          progress="0.30"
          increase="+5%"
          icon={
            <SellIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
        
        
        }




         {window.outerWidth<=600? <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalBuys}
            subtitle="Total items bought so far"
            progress="0.80"
            increase="+43%"
            icon={
              <ShoppingCartCheckoutIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>   
        
        :
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalBuys}
            subtitle="Total items bought so far"
            progress="0.80"
            increase="+43%"
            icon={
              <ShoppingCartCheckoutIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>   
        
        }

        {/* ROW 2 */}
   



{window.outerWidth<=600?<Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Total Earnings By Section ($)
          </Typography>
          <Box height="200px">
            < PieChartTotalSold postsPie={postsPiSoled} />
          </Box>


        </Box>
        :
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Total Earnings By Section ($)
          </Typography>
          <Box height="200px">
            < PieChartTotalSold postsPie={postsPiSoled} />
          </Box>


        </Box>
        
        }

        
{window.outerWidth<=600? <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Total spendings By Section ($)
          </Typography>
          <Box height="200px">
            <PieChartTotalSold  postsPie={postsPieSpent}/>
          </Box>
          </Box>

          :

          <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Total spendings By Section ($)
          </Typography>
          <Box height="200px">
            <PieChartTotalSold  postsPie={postsPieSpent}/>
          </Box>
          </Box>
}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="hidden"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>

 */}


         


          {/* {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))} */}
        {/* </Box> */}

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
      
        
      </Box>
    </Box>
  );
};

export default Dashboard;
