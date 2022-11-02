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



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  useEffect( ()=>{
    
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
              <Route path="/" element={<Dashboard />} />
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
