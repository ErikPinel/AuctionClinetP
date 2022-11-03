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





useEffect( ()=>{

  const fetchPostsCurrent= async ()=>{
     
      await axios.post("http://localhost:5000/api-currentHistory/chart",{id:localStorage.getItem("logged")}).then((res) => {
        setTotalRevenue(res.data.total);
        console.log(1)
          })

            axios.post("http://localhost:5000/api-currentHistory/totalBids",{id:localStorage.getItem("logged")}).then((res) => {
            setTotalBids(res.data.total);
            console.log(2)
              })

                axios.post("http://localhost:5000/api-users/users/Bought",{id:localStorage.getItem("logged")}).then((res) => {
                setTotalBuys(res.data?res.data.TotalItemsBought:0)
                setPostsPieSpent(res.data.revanue)
                console.log(3)
                  })


                    axios.post("http://localhost:5000/api-users/users/Soled",{id:localStorage.getItem("logged")}).then((res) => {
                    setTotalSales(res.data?res.data.TotalItemsSoled:0);
                    setPostsPiSoled(res.data.revanue)
                    console.log(4)
                    // localStorage.setItem("4",`${res.data?res.data.TotalItemsSoled:0}`)
                    
                      })
  




  }
  localStorage.getItem("logged")? fetchPostsCurrent() : localStorage.getItem("logged");
 
},[])

  return (
  
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>


              <Route path="/" element={<Dashboard     
            totalRevenue={totalRevenue} totalBids={totalBids} totalSales={totalSales} totalBuys={totalBuys} postsPieSpent={postsPieSpent} postsPiSoled={postsPiSoled}  />} />
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
              
              
              <Route path="/displayMen" element={<DisplayItemMen/>}/> 
              <Route path="/displayWomen" element={<DisplayItemWomen/>}/> 
              <Route path="/displayKids" element={<DisplayItemKids/>}/> 
              <Route path="/displayCurrent" element={<DisplayItemCurrent/>}/> 
              <Route path="/displayCurrentSell" element={<DisplayItemCurrentSell/>}/> 
              <Route path="/displayItemBoughtAndSoled" element={<DisplayItemBought/>}/> 
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
