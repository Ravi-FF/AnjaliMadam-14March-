// MainPage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    const [localData, setLocalData] = useState([])
    useEffect(() => {
        let storeData = JSON.parse(localStorage.getItem("formData")) || []
        setLocalData(storeData)
    }, [])
    console.log(localData);
    return (
        <div>
            <Link to="/FormPage">
                <div className='text-center my-5'>
                    <button className="px-6 py-2  text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600">
                        Add Data
                    </button>
                </div>
            </Link>
            {localData.length == "" ? <h1>No Data Found</h1> :
                <>
                    <table className="w-[90%] mx-auto rounded-lg overflow-hidden text-sm text-left  text-white">
                        <thead className="text-xs uppercase bg-gray-600">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" colSpan={4} className="px-6 py-3 text-center">
                                    Subject
                                </th>

                            </tr>
                        </thead>
                        <tbody className='bg-gray-800'>
                            {localData.map((elm, i) => {
                                return <tr key={i} className="border-b">
                                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                                        {elm.input.name}
                                    </th>
                                    <td className="px-6 py-4">{elm.input.email}</td>
                                    <td className="px-6 py-4">{!elm.checkbox.checkbox1 ? "No Data" : elm.checkbox.checkbox1}</td>
                                    <td className="px-6 py-4">{!elm.checkbox.checkbox2 ? "No Data" : elm.checkbox.checkbox2}</td>
                                    <td className="px-6 py-4">{!elm.checkbox.checkbox3 ? "No Data" : elm.checkbox.checkbox3}</td>
                                    <td className="px-6 py-4">{!elm.checkbox.checkbox4 ? "No Data" : elm.checkbox.checkbox4}</td>

                                </tr>
                            })}
                        </tbody>
                    </table>
                </>
            }
        </div>
    );
}

export default MainPage;
