import './index.css';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from './pages/global/Topbar';
// import Dashboard from "../src/pages/dashboard";
import Team from "../src/pages/team";
import Invoices from "../src/pages/invoices";
import Bar from "../src/pages/bar";
import Contacts from "../src/pages/contacts";
import Form from './pages/form';
// import Line from "../src/pages/line";
// import Pie from "../src/pages/pie";
import FAQ from "../src/pages/faq";
// import Geography from "../src/pages/geography";
import Calendar from "../src/pages/calendar";
import Sidebar from './pages/global/Sidebar';
import Dashboard from './pages/dashboard';
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="App">
        <Sidebar/>
        <main>
          <Topbar/>
          <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/form" element={<Form />}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/invoices" element={<Invoices/>}/>
          <Route path="/bar" element={<Bar/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          {/* <Route path="/line" element={<Line/>}/> */}
          {/* <Route path="/pie" element={<Pie/>}/> */}
          <Route path="/faq" element={<FAQ/>}/>
          {/* <Route path="/geography" element={<Geography/>}/> */}
          <Route path="/calendar" element={<Calendar/>}/>
          </Routes>
        </main>
      </div>
    </ThemeProvider>  
    </ColorModeContext.Provider>
    
  );
}

export default App;
