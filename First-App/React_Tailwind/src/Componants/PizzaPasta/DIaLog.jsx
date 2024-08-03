import React, { useEffect, useState } from 'react'

export default function DIaLog({ data, toggleFun, localDataPass }) {
    let { name, age, city, date, pizza, pasta, } = data;
    const [cancle, setCancle] = useState(false)
    return (
        <div className='w-2/4 opacity-75 border shadow-lg bg-white rounded-lg py-4 px-10'>
            <h1 className='text-center mb-4 text-2xl font-medium '>Confirm Your Order </h1>
            <div>
                {cancle ? <h1 className='mb-5 text-[red] font-medium text-[18px]'>Your order has been cancelled successfully....!</h1> : <table className='w-full'>
                    <tbody>
                        <tr>
                            <td className='py-2'>Name </td>
                            <td className='py-2 text-end'><strong>{name}</strong></td>
                        </tr>
                        <tr>
                            <td className='py-1'>Age </td>
                            <td className='py-1 text-end'><strong>{age}</strong></td>
                        </tr>
                        <tr>
                            <td className='py-1'>City </td>
                            <td className='py-1 text-end'><strong>{city}</strong></td>
                        </tr>
                        <tr>
                            <td className='py-1'>Date </td>
                            <td className='py-1 text-end'><strong>{new Date(date).toLocaleDateString('en-GB')}</strong></td>
                        </tr>
                        <tr>
                            <td className='py-1'>Numbers Pizza </td>
                            <td className='py-1 text-end'><strong>{pizza}</strong></td>
                        </tr>
                        <tr>
                            <td className='py-1'>Numbers Pasta </td>
                            <td className='py-1 text-end'><strong>{pasta}</strong></td>
                        </tr>
                        <tr>
                            <td className='py-1'>Pizza Total </td>
                            <td className='py-1 text-end'><strong>₹ {(pizza * 105).toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td className='py-1'>Pasta Total </td>
                            <td className='py-1 text-end'><strong> ₹ {(pasta * 99.98).toFixed(2)}</strong></td>
                        </tr>
                        <tr className='text-center'>
                            <td colSpan={2}>
                                <h1 className='font-bold'>Your Total Bill is : <span className='text-[25px] text-red-600'>₹ {((pizza * 105) + (pasta * 99.98)).toFixed(2)}</span></h1>
                            </td>
                        </tr>
                    </tbody>
                </table>}
                <div className='text-center space-x-4 mt-2'>
                    <button className='bg-green-700  mx-auto px-7 py-[5px] text-[16px] rounded-md text-white  duration-300 hover:bg-green-800' onClick={() => {
                        localDataPass()
                        setTimeout(() => {
                            toggleFun({
                                ...data,
                                name: "",
                                age: "",
                                city: "",
                                date: "",
                                pizza: "",
                                pasta: "",
                                dialog: false,
                            })
                        })
                    }}>Ok</button>

                    <button className='bg-red-700  mx-auto px-7 py-[5px] text-[16px] rounded-md text-white  duration-300 hover:bg-red-800' onClick={() => {
                        setCancle(true)
                        setTimeout(() => {
                            toggleFun({
                                ...data,
                                name: "",
                                age: "",
                                city: "",
                                date: "",
                                pizza: "",
                                pasta: "",
                                dialog: false,
                            })
                            setCancle(false)
                        }

                            , 1200)
                    }}>Cancle Order</button>
                </div>
            </div>
        </div>
    )
}
