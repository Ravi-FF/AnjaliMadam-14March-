import React from 'react'
import "./Task-1.css"
import WelcomeImg from "./img/welcomeImg.png"
import Header from "./Header"
export default function Welcome() {
    return (
        <>
            <main>
                <div className="welcome">
                    <Header />
                    <div className="welcome-left">
                        <h2>Welcome</h2>
                        <h1>Smart Ideas for your brand Here</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem possimus nostrum quis aliquid odio tenetur, cupiditate deleniti officiis labore nam?</p>
                        <button>CONTACT US NOW</button>
                    </div>
                    <div className="welcome-right">
                        <img src={WelcomeImg} alt="" />
                    </div>
                </div>
            </main>
        </>
    )
}
