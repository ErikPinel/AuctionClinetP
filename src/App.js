import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Register from "./scenes/RegLogIn/Register";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import  Loginform  from "./scenes/RegLogIn/LogIn";
import AddItem from "./scenes/addItem/addItem";
import DisplayItemMen from "./scenes/DisplayItem/DisplayItemMen";
import {DisplayItemWomen} from "./scenes/DisplayItem/DisplayItemWomen";
import DisplayItemKids from "./scenes/DisplayItem/DisplayItemKids";
import DisplayItemCurrent from "./scenes/DisplayItem/DisplayItemCurrent";
import DisplayItemCurrentSell from "./scenes/DisplayItem/DisplayItemCurrentSell";
import PieSoled from "./scenes/pieSoled"

 import DisplayItemBought from "./scenes/DisplayItem/DisplayItemBought";
import axios from "axios";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
const [graphData, setGraphData] = useState([])

const [totalRevenue,setTotalRevenue]=useState(0)
const [totalBids,setTotalBids]=useState(0)
const [totalSales,setTotalSales]=useState(0)
const [totalBuys,setTotalBuys]=useState(0)
const [postsPieSpent,setPostsPieSpent]=useState([])
const [postsPiSoled,setPostsPiSoled]=useState([])
const [userObjName,setUserObjName]=useState();
const [userID,setUserID]=useState();
const[isNotification,setIsNotification]=useState(false);


useEffect( ()=>{


  async function findUser() {
    
    await axios.get(`https://violet-kangaroo-suit.cyclic.app/api-users/users/${localStorage.getItem("logged")}`).then((res) => {
       console.log("topbar")
      let obj = {
        name: res.data[0].fullName,
        email: res.data[0].email,
        phone: res.data[0].phone,
        isSoled: res.data[0].isSoled , 
        isBought: res.data[0].isBought
      };
      if(obj.isSoled||obj.isBought)
      setIsNotification(true)
      setUserObjName(obj.name)
      setUserID(localStorage.getItem("logged"))
    });}

    findUser()


  const fetchPostsCurrent= async ()=>{
     
      await axios.post("https://violet-kangaroo-suit.cyclic.app/api-currentHistory/chart",{id:localStorage.getItem("logged")}).then((res) => {
        setTotalRevenue(res.data.total);
        console.log(1)
          })

            axios.post("https://violet-kangaroo-suit.cyclic.app/api-currentHistory/totalBids",{id:localStorage.getItem("logged")}).then((res) => {
            setTotalBids(res.data.total);
            console.log(2)
              })

                axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/Bought",{id:localStorage.getItem("logged")}).then((res) => {
                setTotalBuys(res.data?res.data.TotalItemsBought:0)
                setPostsPieSpent(res.data.revanue)
                console.log(3)
                  })


                    axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/Soled",{id:localStorage.getItem("logged")}).then((res) => {
                    setTotalSales(res.data?res.data.TotalItemsSoled:0);
                    setPostsPiSoled(res.data.revanue)
                    console.log(4)
                    // localStorage.setItem("4",`${res.data?res.data.TotalItemsSoled:0}`)
                    
                      })
  


                     

  }
  localStorage.getItem("logged")? fetchPostsCurrent() :setUserID("");
 
},[])






  return (
  
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} userID={userID} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} userObjName={userObjName} isNotification={isNotification}  setIsNotification={setIsNotification}/>
            <Routes>


              <Route path="/" element={<Dashboard     
            totalRevenue={totalRevenue} totalBids={totalBids} totalSales={totalSales}
             totalBuys={totalBuys} postsPieSpent={postsPieSpent} postsPiSoled={postsPiSoled}  userObjName={userObjName}
             userID ={userID}/>} />
             
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logIn" element={<Loginform />} />
              <Route path="/addItem" element={<AddItem />}/>
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/pieSoled" element={<PieSoled />} />
              {/* <Route path="/pieSpent" element={<PieSpent />} /> */}
              
              
              <Route path="/displayMen" element={<DisplayItemMen  userID ={userID}/>}/> 
              <Route path="/displayWomen" element={<DisplayItemWomen userID ={userID}/>}/> 
              <Route path="/displayKids" element={<DisplayItemKids userID ={userID}/>}/> 
              <Route path="/displayCurrent" element={<DisplayItemCurrent userID ={userID}/>}/> 
              <Route path="/displayCurrentSell" element={<DisplayItemCurrentSell userID ={userID}/>}/> 
              <Route path="/displayItemBoughtAndSoled" element={<DisplayItemBought userID ={userID}/>}/> 
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
