import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ProductData() {
    const [productData, setProductData] = useState([])
    const [category, setCategory] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const fatchData = async () => {
            const response = (await axios.get("https://fakestoreapi.com/products")).data
            setProductData(response)
        }
        fatchData()
    }, [])

    const singleDataFatch = async (e) => {
        const response = (await axios.get(`https://fakestoreapi.com/products/category/${e.toLowerCase()}`)).data
        if (!e) {
            setProductData((await axios.get("https://fakestoreapi.com/products")).data)

        }
        if (e) {
            setProductData(response)
        }
        // console.log(response);
    }
    // const filterData = productData.filter((filterItem, i) => {
    //     return filterItem.category.toUpperCase().includes(category.toUpperCase().trim())
    // })
    const sortData = (data) => {
        if (data === "max") {
            setProductData([...productData].sort((x, y) => y.price - x.price))
        }
        if (data === "min") {
            setProductData([...productData].sort((x, y) => x.price - y.price))
        }
    }

    return (
        <div className='sm:px-20 px-10'>
            <h1 className='sm:text-6xl text-5xl font-medium text-center whitespace-[4px] my-4 tracking-wide'><span className='text-8xl font-serif text-indigo-700'>P</span>roduct <span className='text-8xl font-serif text-red-500'>A</span>pp</h1>
            <div className='flex justify-between items-center'>
                <button className="text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded" value="max" onClick={(e) => sortData(e.target.value)} >
                    Max to Min
                </button>
                <button className=" text-white bg-violet-500 border-0 py-2 px-6 focus:outline-none hover:bg-violet-600 rounded" value="min" onClick={(e) => sortData(e.target.value)} >
                    Min to Max
                </button>
                <div>
                    <select name="" id="" className='border px-2 py-1 focus:outline-gray-300 capitalize text-[15px] font-semibold cursor-pointer' onChange={(e) => singleDataFatch(e.target.value)}>
                        <option className='font-medium' value="">All Category</option>
                        <option className='font-medium' value="men's clothing" >men's clothing</option>
                        <option className='font-medium' value="Women's clothing" >Women's Clothing</option>
                        <option className='font-medium' value="Electronics" >Electronics</option>
                        <option className='font-medium' value="Jewelery" >Jewelery</option>
                    </select>
                </div>
            </div>


            <section className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-10'>
                {productData.length == 0 ? <h1>Data is Loading.......!</h1> : productData.map(({ id, category, title, price, image
                }) => {
                    return <div key={id} className="group cursor-pointer bg-white shadow-md overflow-hidden rounded-xl duration-500 hover:scale-105 hover:shadow-xl border border-gray-300 ">
                        <div onClick={() => navigate(`/Prodoct/${id}`)}>
                            <div className='h-72 overflow-hidden'>
                                <img
                                    src={image}
                                    alt="Product"
                                    className="object-contain object-center h-full w-full rounded-t-xl group-hover:scale-105 duration-200 ease-in-out "
                                />
                            </div>
                            <div className="px-4 py-3">
                                <span className="text-gray-600 mr-3 uppercase text-xs">{category}</span>
                                <p className="text-lg group-hover:text-indigo-900 duration-150 font-bold text-black truncate block capitalize">
                                    {title}
                                </p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                                        $ {price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </section >
        </div >
    )
}
