import { Outlet } from "react-router-dom";
import Nvabar from "../components/Nvabar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import { ThemeContextProvider } from "../context/themeContext.jsx";
import Loader from "../components/loader/Loader.jsx";

const Layout = () => {
  const[isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer);
    }
  }, [])

  const[theme, setTheme] = useState(() => {
    return JSON.parse(localStorage.getItem("theme")) || "light"
  });
   
  const lightThemeMode = () => {
    setTheme("light");
  }
  const darkThemeMode = () => {
    setTheme("dark")
  }

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    setTheme(theme)
  }, [theme])

  return (
    isloading ? ( <Loader /> ) : 
    ( 
      <ThemeContextProvider value={{theme, lightThemeMode, darkThemeMode}}>
        <div className={`${theme} flex flex-col min-h-screen`}>
          <Nvabar />
          <div className="bg-gray-500 flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeContextProvider>
    )
  );
};

export default Layout;
