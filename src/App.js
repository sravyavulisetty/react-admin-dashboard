// App.js
import React, { useState } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from './pages/dashboard/index'
import Team from "../src/pages/team/index";
import Invoices from "../src/pages/invoices/index";
import Bar from "../src/pages/bar/index";
import Contacts from "../src/pages/contacts/index";
import Form from "../src/pages/form/index";
import Line from "../src/pages/line/index";
import Pie from "../src/pages/pie/index";
import FAQ from "../src/pages/faq/index";
import Geography from "../src/pages/geography/index";
import Calendar from "../src/pages/calendar/index";

const App = () => {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const matches = useMediaQuery("(min-width:769px)");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              isToggled={isToggled}
              toggleSideBar={() => setIsToggled(!isToggled)}
            />
            <main
              className="content"
              style={{
                paddingLeft: matches && !isCollapsed ? "250px" : "80px",
                transitionDelay: "240ms",
              }}
            >
              <Topbar toggleSideBar={() => setIsToggled(!isToggled)} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/form" element={<Form />} />
                <Route path="/team" element={<Team />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/line" element={<Line />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;


