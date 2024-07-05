import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ProductDisplay() {
    const [productData, setProductData] = useState([])
    useEffect(() => {
        const productFatchData = async () => setProductData((await axios.get("https://fakestoreapi.com/products")).data)
        productFatchData()
    }, [])
    if (productData.length == 0) {
        return <h1>Loading......!</h1>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>title</th>
                    <th>Price</th>
                    <th>category</th>
                    <th>image</th>
                    <th>View</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    )
}
