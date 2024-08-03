import { useState } from "react";
import { Link, json } from "react-router-dom";

// HeroPage.js
function FormPage() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState(
        {
            input: {
                name: "",
                email: ""
            },
            checkbox: {
                checkbox1: false,
                checkbox2: false,
                checkbox3: false,
                checkbox4: false,
            },
            radio: "",
            select: {
                selectValue: "",
            }
        }
    )
    const handleNameEmail = (event) => setFormData({ ...formData, input: { ...formData.input, [event.target.name]: event.target.value } })

    const handleChacked = (event) => {
        setFormData({ ...formData, checkbox: { ...formData.checkbox, [event.target.name]: event.target.checked ? event.target.value : "" } })
    }
    const handleRadio = (event) => setFormData({ ...formData, radio: event.target.value })

    const handleSelect = (event) => setFormData({ ...formData, select: { ...formData.select, [event.target.name]: event.target.value } })


    const handleSubmit = (event) => {
        event.preventDefault()
        setData([...data, formData])
        localStorage.setItem("formData", JSON.stringify([...data, formData]))
        setFormData(
            {
                input: {
                    name: "",
                    email: ""
                },
                checkbox: {
                    checkbox1: false,
                    checkbox2: false,
                    checkbox3: false,
                    checkbox4: false,
                },
                radio: "",
                select: {
                    selectValue: "",
                }

            })
    }
    return (
        <div className='bg-gray-200 h-screen d-grid pt-20'>
            <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">
                    Personal Information
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-200" htmlFor="username">
                                Name
                            </label>
                            <input
                                id="username"
                                type="text" placeholder='Enter Your Name.......!' name="name" value={formData.input.name} onChange={(e) => handleNameEmail(e)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="text-gray-200">Email Address</label>
                            <input id="emailAddress" type="email" placeholder='Enter Your Email....!' name="email" value={formData.input.email} onChange={(e) => handleNameEmail(e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-gray-200">Subject</label>
                            <div className='mt-3 flex justify-between'>
                                <div>
                                    <input id='react' type="checkbox" placeholder='Enter Your Email....!' className="cursor-pointer" value={"React"} name="checkbox1" checked={formData.checkbox.checkbox1} onChange={(e) => handleChacked(e)} />
                                    <label htmlFor='react' className="text-gray-200 ms-3 cursor-pointer">React</label>
                                </div>
                                <div>
                                    <input id='Python' type="checkbox" placeholder='Enter Your Email....!' className="cursor-pointer" value={"Python"} name="checkbox2" checked={formData.checkbox.checkbox2} onChange={(e) => handleChacked(e)} />
                                    <label htmlFor='Python' className="text-gray-200 ms-3 cursor-pointer">Python</label>
                                </div>
                                <div>
                                    <input id='Java' type="checkbox" placeholder='Enter Your Email....!' className="cursor-pointer" value={"Java"} name="checkbox3" checked={formData.checkbox.checkbox3} onChange={(e) => handleChacked(e)} />
                                    <label htmlFor='Java' className="text-gray-200 ms-3 cursor-pointer">Java</label>
                                </div>
                                <div>
                                    <input id='JavaScript' type="checkbox" value={"JavaScript"} name="checkbox4" placeholder='Enter Your Email....!' className="cursor-pointer" checked={formData.checkbox.checkbox4} onChange={(e) => handleChacked(e)} />
                                    <label htmlFor='JavaScript' className="text-gray-200 ms-3 cursor-pointer">JavaScript</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200">Select</label>
                            <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" name="selectValue" value={formData.select.selectValue} onChange={(e) => handleSelect(e)}>
                                <option hidden>Select City</option>
                                <option value={"Mumbai"}>Mumbai</option>
                                <option value={"Delhi"}>Delhi</option>
                                <option value={"Kolkata"}>Kolkata</option>
                                <option value={"Chennai"}>Chennai</option>
                                <option value={"Bangalore"}>Bangalore</option>
                                <option value={"Hyderabad"}>Hyderabad</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-200"> Gender</label>
                            <div className='mt-3 flex gap-10'>
                                <div>
                                    <input id='Male' type="radio" name="gender" value="male" checked={formData.radio === "male"} onChange={(e) => handleRadio(e)} className="cursor-pointer" />
                                    <label htmlFor='Male' className="text-gray-200 ms-3 cursor-pointer">Male</label>
                                </div>
                                <div>
                                    <input id='Female' type="radio" name="gender" value="female" checked={formData.radio === "female"} onChange={(e) => handleRadio(e)} className="cursor-pointer" />
                                    <label htmlFor='Female' className="text-gray-200 ms-3 cursor-pointer">Female</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                            Save
                        </button>
                        <Link to={"/"}>
                            <button type='button' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-700 focus:outline-none focus:bg-gray-600">
                                Show Data
                            </button>
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default FormPage;
