import React from 'react'
import "./Task-1.css"
import img from "./img/welcomeImg.png"
export default function Header() {
    return (
        <header>
            <img src={img} alt="" />
            <nav>
                <h1 className="logo">Shivaa.</h1>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Pages</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contect Us</a></li>
                </ul>
                <div className="icons">
                    <span>Icon-1</span>
                    <span>Icon-2</span>
                </div>
            </nav>
        </header>
    )
}
