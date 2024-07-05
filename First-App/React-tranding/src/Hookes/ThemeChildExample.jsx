import React from 'react'
import { useContext } from 'react'
// import { themeContext } from './ThemeComponentExample'
// import { themeContext } from './UseContextHook/ThemeComponentExample1'
import { themeContext } from './UseContextHook/ThemeComponentExample1'

export default function ThemeChildExample() {

    const { theme, toggleTheme } = useContext(themeContext)
    const mystyle = {
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : 'white'
    }
    return (
        <div style={{ backgroundColor: mystyle.backgroundColor, color: mystyle.color }}>
            <h1>Current theme is {theme}</h1>
            <button onClick={toggleTheme}>Change Theme</button>
        </div>
    )
}
