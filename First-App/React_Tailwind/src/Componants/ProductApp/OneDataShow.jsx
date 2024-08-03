import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function OneDataShow() {
    const { id } = useParams()
    const [SingleData, setSingleData] = useState({})
    const navigate = useNavigate()
    const { category, description, price, title, image } = SingleData
    useEffect(() => {
        const FatchData = async () => {
            const SingleProduct = (await axios.get(`https://fakestoreapi.com/products/${id}`)).data
            { SingleProduct && setSingleData(SingleProduct) }
        }
        FatchData()
    }, [])
    // console.log(SingleData);
    return (

        <div className='grid place-items-center h-screen bg-slate-100'>
            <div className="container capitalize  px-5 mx-auto w-[80%] cursor-pointer border py-10 bg-white shadow-lg rounded-lg  border-gray-300">
                <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
                    <div>
                        <img
                            alt="ecommerce"
                            className="w-[50%] mx-auto object-cover object-center rounded"
                            src={image}
                            style={{ cursor: "auto" }}
                        />
                    </div>
                    <div
                        className=""
                        style={{ cursor: "auto" }}
                    >
                        <h2
                            className="text-sm title-font text-gray-500 tracking-widest"
                        >
                            ON SALE
                        </h2>
                        <h1 className='text-lg title-font my-3 text-gray-700 tracking-widest'>{category}</h1>
                        <h1
                            className="text-gray-900 text-3xl title-font font-medium mb-5"
                            style={{ cursor: "auto" }}
                        >
                            {title}
                        </h1>
                        <p className="leading-relaxed mb-10">
                            {description}
                        </p>
                        <div className="flex  border-t-2 pt-5 border-gray-100">
                            <span className="title-font font-medium text-2xl text-gray-900">
                                $ {price}
                            </span>

                            <button onClick={() => navigate("/")} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                Back To Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
