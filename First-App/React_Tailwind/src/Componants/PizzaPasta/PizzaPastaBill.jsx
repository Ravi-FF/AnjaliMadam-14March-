import React from 'react'

export default function PizzaPastaBill({billData}) {
    const {totalPizzaPrice,totalPastaPrice,totalPizzaPasta,giftCount} = billData;
  return (
    <div className='bg-white rounded-lg border border-red-600 md:w-[70%] shadow-lg mt-10 mx-auto px-8 py-5'>
        <h1 className='mb-4 font-mono text-center font-semibold text-[20px]'>----------- Pizza And Pasta Bill --------------</h1>
        <p className='mb-3'>Payment Received From Pizza : <strong> ₹{totalPizzaPrice}</strong></p>
        <p className='mb-3'>Payment Received From Pasta : <strong> ₹{totalPastaPrice}</strong></p>
        <p className='mb-3'>Payment Received Today: <strong>₹{totalPizzaPasta}</strong></p>
        <p className='mb-3'>Number Of 1.5lt Soft Drink Bottles Given: <strong>{giftCount.Softdrink}</strong></p>
        <p className='mb-3'>Number Of Bruschetta Given To Customer : <strong>{giftCount.Bruschetta}</strong></p>
        <p>Number Of Chocco Brownies Ice Cream Given To Customer : <strong>{giftCount.IceCream}</strong></p>
    </div>
  )
}
