import React from 'react'

export default function PizzaPastaCard({ localData, deleteFun }) {
    return (
        <div className='grid md:grid-cols-4 gap-4 mt-6 px-3'>
            {localData.map(({ name, age, city, date, pasta, pizza }, i) => {
                const pizzaImages = [];
                const pastaImages = []
                for (let index = 0; index < pizza; index++) {
                    pizzaImages.push(<img key={index} src="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=" alt="Pizza" className="w-12 h-12 object-cover object-center rounded-full mx-2" />)
                }
                for (let index = 0; index < pasta; index++) {
                    pastaImages.push(<img key={index} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgvWnaqxOoeX-K1TV90XV2Id4u-dvvbNFIi1UVMdHDhxxNRP5vLZxT3PIv_gY3lQOJvc&usqp=CAU" alt="Pasta" className="w-12 rounded-full object-cover object-center h-12 mx-2" />)
                }
                return <div key={i} className='text-black border  border-black  py-4 overflow-hidden position: relative px-5 text-center shadow-lg rounded-xl'>
                    <div className='position: absolute top-[50%] left-[50%] -translate-x-[50%] -z-10 -translate-y-[50%]'>
                        <img src="https://png.pngtree.com/png-clipart/20220719/original/pngtree-pizza-logo-design-png-image_8363624.png" alt="" />
                    </div>
                    <span className=' h-12 rounded-full w-12 leading-[3rem] border text-black bg-yellow-400 border-slate-400 font-semibold text-[20px] shadow-lg inline-block'>{i + 1}</span>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Name : </span><strong>{name}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Age  : </span><strong>{age}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>City : </span><strong>{city}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Date : </span><strong>{new Date(date).toLocaleDateString('en-GB')}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Numbers of Pizza : </span><strong>{pizza}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Number of Pasta: </span><strong>{pasta}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Total Pizza Price: </span><strong>₹ {(pizza * 105).toFixed(2)}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Total Pasta Price: </span><strong>₹ {(pasta * 99.98).toFixed(2)}</strong></p>
                    <p className='flex justify-between leading-10 border-b border-zinc-400'><span>Total Bill : </span><strong className='text-green-700'>₹ {((pizza * 105) + (pasta * 99.98)).toFixed(2)}</strong></p>
                    {pizza >= 4 && <p className='my-2 font-semibold text-green-800' >Congrats 🎉 !! You Get 1.5lt Softdrink Free</p>}
                    {pasta >= 4 && <p className='my-2 font-semibold text-green-800' >Congrats 🎉 !! You Get 2 Bruschetta Free</p>}
                    {pasta >= 4 && pizza >= 4 ? <p className='my-2 font-semibold text-green-800' >Congrats 🎉 !! You Get 2 Bruschetta Free</p> : ""}
                    <button className='bg-red-600 mx-auto my-3 p-5 py-[5px] text-[15px] rounded-md text-white font-bold  duration-300 hover:bg-red-500' onClick={() => deleteFun(i)} >Delete Order</button>
                    <div className="flex  my-2">
                        {pizzaImages}
                    </div>
                    <div className="flex my-2">
                        {pastaImages}
                    </div>
                </div>
            })}

        </div>
    )
}
