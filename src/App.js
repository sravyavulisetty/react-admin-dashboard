
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./pages/global/Topbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./pages/global/Sidebar";
import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Team from "../src/pages/team";
import Invoices from "../src/pages/invoices";
import Bar from "../src/pages/bar";
import Contacts from "../src/pages/contacts";
import Form from './pages/form';
import Line from "../src/pages/line";
import Pie from "../src/pages/pie";
import FAQ from "../src/pages/faq";
import Geography from "../src/pages/geography";
import Calendar from "../src/pages/calendar";
import Dashboard from './pages/dashboard';

const App = () => {
	const [theme, colorMode] = useMode();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isToggled, setIsToggled] = useState(false);

	const matches = useMediaQuery('(min-width:769px)');
	const memoizedOutletContent = useMemo(() => <Outlet />, []);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isToggled={isToggled} toggleSideBar={() => setIsToggled(!isToggled)}/>
          <main className="content" style={{ paddingLeft:  matches && (!isCollapsed ? "250px" : "80px"), transitionDelay: "240ms"}}>
            <Topbar toggleSideBar={() => setIsToggled(!isToggled)}/>
						<Routes>
           <Route path="/" element={<Dashboard/>}/>
           <Route path="/form" element={<Form />}/>
           <Route path="/team" element={<Team/>}/>
           <Route path="/invoices" element={<Invoices/>}/>
           <Route path="/bar" element={<Bar/>}/>
           <Route path="/contacts" element={<Contacts/>}/>
           <Route path="/line" element={<Line/>}/>
           <Route path="/pie" element={<Pie/>}/>
           <Route path="/faq" element={<FAQ/>}/>
             <Route path="/geography" element={<Geography/>}/>
             <Route path="/calendar" element={<Calendar/>}/>
           </Routes>
          </main>
        </div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default App;
