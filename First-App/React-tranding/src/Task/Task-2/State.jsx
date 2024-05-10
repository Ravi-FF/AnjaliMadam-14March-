import React, { useState } from 'react'
import bulboff from "./img/light-bulb-off.png"
import bulbon from "./img/light-bulb-on.png"
import car1 from "./img/img-1.png"
import car2 from "./img/img-2.png"
import car3 from "./img/img-3.png"
import car4 from "./img/img-4.png"
import car5 from "./img/img-5.png"
export default function State() {
    let randomcolor;
    let [count, setcount] = useState(0)
    let [color, setcolor] = useState("")
    let [size, setsize] = useState(20)
    let [bulb, setbulb] = useState(false)

    let [randomclr, setrandomclr] = useState("pink")
    let [randomtext, setrandomText] = useState("white")
    function changeColor() {
        let red1 = Math.floor(Math.random() * 256)
        let green1 = Math.floor(Math.random() * 256)
        let blue1 = Math.floor(Math.random() * 256)

        let red2 = Math.floor(Math.random() * 256)
        let green2 = Math.floor(Math.random() * 256)
        let blue2 = Math.floor(Math.random() * 256)

        setrandomclr(randomclr = `rgb(${red1},${green1},${blue1})`)
        setrandomText(randomtext = `rgb(${red2},${green2},${blue2})`)
    }
    let imageArr = [car1, car2, car3, car4, car5]
    let [changeImg, setchangeImg] = useState(imageArr[0])
    let counter = 0;
    function handleImg() {
        counter++
        console.log(counter);
        console.log(changeImg);
        setchangeImg(imageArr[counter])
        console.log(counter);
    }
    return (
        <div>
            <section>
                <button onClick={() => setcount(count + 1)}>+</button>
                <span style={{ fontSize: "25px" }}>{count}</span>
                <button onClick={() => setcount(count - 1)}>-</button>
            </section>

            <section className="color-picker">
                <input onChange={(event) => setcolor(color = (event.target.value))} type="color" />
                <div style={{ backgroundColor: color }} className='color-input'></div>
            </section>

            <section>
                <h1 style={{ fontSize: size }}>font-Size : <span>{size}px</span> </h1>
                <button onClick={() => setsize(size + 5)}>increase</button>
                <button onClick={() => setsize(size - 5)}>decrease</button>
            </section>
            <section>
                <div className="show-img-box">
                    <img src={changeImg} alt="" />
                </div>
                <button onClick={handleImg}>Click ME</button>
            </section>

            <section>
                <div className="bulb-box">
                    <img src={bulb ? bulbon : bulboff} alt="" />
                </div>
                <button onClick={() => setbulb(!bulb)}>{bulb ? "bulb off" : "bulb on"}</button>
            </section>

            <section>
                <button onClick={changeColor} style={{ background: randomclr, color: randomtext }}>Click ME</button>
            </section>
        </div>
    )
}
