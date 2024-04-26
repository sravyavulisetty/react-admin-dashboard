import { createContext, useState } from "react";
const ThemeContext = createContext();
export function ThemeProvider({children}){
    const [theme, setTheme] = useState("light");
    function toggleTheme(){
       setTheme((prev)=>prev === "light" ? "dark" : "light")
    }
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeContext;