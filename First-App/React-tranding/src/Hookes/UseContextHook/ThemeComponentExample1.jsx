import React, {createContext, useState } from 'react'
export const themeContext = createContext()
export default function ThemeComponentExample1({children}) {
    const [theme, setTheme] = useState("light")
    const toggleTheme = () => {
        setTheme((previousTheme) => previousTheme === "light" ? "dark" : "light")
        setTheme(theme === "light" ? "dark" : "light")
    }
    return (
        <div>
            <themeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </themeContext.Provider>
        </div>
    )
}
