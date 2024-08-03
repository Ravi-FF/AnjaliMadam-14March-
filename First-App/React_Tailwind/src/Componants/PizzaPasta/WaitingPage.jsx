import React from 'react'

export default function WaitingPage({ hideFun }) {
    return (
        <div>
            <h1 className='text-5xl text-center text-white font-semibold font-serif mt-10'>Welcome To Amazing Pizza And Pasta Pizzeria</h1>
            <div className='bg-white p-5 w-2/5 rounded-xl shadow-lg mx-auto mt-20 border border-slate-300'>
                <p className='text-[17px] font-semibold leading-10'>Per Pizza Price = ₹ 150</p>
                <p className='text-[17px] font-semibold leading-10'>Per Pasta Price = ₹ 99.98</p>
                <p className='text-[17px] font-semibold leading-10'>Buy 4 or more pizza and get 1.5lt of soft drink free</p>
                <p className='text-[17px] font-semibold leading-10'>Buy 4 or more pastas and get 2 bruschetta free.</p>
                <p className='text-[17px] font-semibold leading-10'>Buy 4 or more pizzas and pastas and get 2 chocco brownies ice cream free.</p>
                <p className='text-[17px] font-semibold leading-10 text-[red]'>You can order maximum 05 Pizza and 05 Pasta only...!</p>
                <div className='text-center'>
                    <button className='bg-sky-950 px-7 py-[4px] mt-5 text-[16px] rounded-md text-white  duration-300 hover:bg-sky-900' onClick={()=>hideFun(false)}>Close</button>
                </div>

            </div>
        </div>
    )
}
