import React, { useEffect, useRef, useState } from 'react'
import PizzaPastaBill from './PizzaPastaBill';
import DIaLog from './DIaLog';
import WaitingPage from './WaitingPage';
import PizzaPastaCard from './PizzaPastaCard';

export default function PizzaPasta() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        city: "",
        date: "",
        pizza: "",
        pasta: "",
        dialog: false,
    })

    const nameRef = useRef()
    const cityRef = useRef()
    const pizzaRef = useRef()
    const pastaRef = useRef()
    const [errors, setErrors] = useState({})

    const [storedData, setStoredData] = useState([])
    const [popUp, setPopUp] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setPopUp(true)
        }, 1000)
    }, [])

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem("orderData")) || [];
        setStoredData(localData);
    }, []);

    function handleLocal() {
        let localData = JSON.parse(localStorage.getItem("orderData")) || [];
        localData.push(formData);
        localStorage.setItem("orderData", JSON.stringify(localData));
        setStoredData(localData);
    }

    function handleDelete(index) {
        const updatedData = storedData.filter((_, i) => i !== index);
        localStorage.setItem("orderData", JSON.stringify(updatedData));
        setStoredData(updatedData);
    }
    function HandleErr() {
        const showError = {}
        const nameErr = nameRef.current.value.trim();
        const cityErr = cityRef.current.value.trim();
        const pizzaErr = +pizzaRef.current.value.trim();
        const pastaErr = +pastaRef.current.value.trim();
        if (!/^[a-zA-Z_]*$/.test(cityErr)) showError.cityError = "Only Characters Allowed...!"
        if (!/^[a-zA-Z_ ]*$/.test(nameErr)) showError.nameError = "Only Characters Allowed...!"
        if (pizzaErr > 5) showError.pizzaError = "You can order Maximam 5 Pizza!"
        if (pastaErr > 5) showError.pastaError = "You can order Maximam 5 Pasta!"
        setErrors(showError)
    }
    const handleFormData = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    function handleSubmit(event) {
        event.preventDefault();
        let { name, age, city, date, pizza, pasta } = formData
        if (name == "" || age == "" || city == "" || date == "" || pizza == "" || pasta == "") {
            alert("Please Fill All Detail......!")
        } else {
            setFormData({ ...formData, dialog: true })

        }
    }
    return (
        <div className='py-10'>
            <div className={`position: fixed inset-0 bg-[url('https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  bg-center  bg-cover bg-no-repeat duration-500 ease-in-out z-50 ${popUp ? '-translate-y-0' : '-translate-y-full'}`}>
                <div className='position: absolute inset-0 bg-gray-950/25  -z-10'></div>
                <WaitingPage hideFun={setPopUp} />
            </div>
            <div className="md:w-[50%] border px-5 py-3  m-auto rounded-md shadow bg-blue-100 ">

                <form onSubmit={handleSubmit}>
                    <div className="customer-detail">
                        <h1 className='text-center text-[25px] font-semibold'>Customer Detail</h1>
                        <div className='grid md:grid-cols-2 gap-5 my-4'>
                            <div>
                                <label className='mb-4'>Name : </label>
                                <input type="text" value={formData.name} ref={nameRef} name='name' onInput={HandleErr} onChange={handleFormData} className=' mt-2 text-[15px]  px-2 py-1 w-full border border-slate-500	rounded-md' placeholder='Enter customer Name....!' />
                                {errors.nameError && <p className='mt-3 text-[15px] text-red-500 font-semibold'>{errors.nameError}</p>}
                            </div>
                            <div>
                                <label >Age : </label>
                                <input type="number" value={formData.age} name='age' onChange={handleFormData} onInput={HandleErr} className='mt-2 text-[15px]  px-2 py-1 w-full border border-slate-500	rounded-md' placeholder='Enter customer Age....!' />
                            </div>
                            <div>
                                <label >City : </label>
                                <input type="text" value={formData.city} ref={cityRef} name='city' onInput={HandleErr} onChange={handleFormData} className='mt-2 text-[15px]  px-2 py-1 w-full border border-slate-500	rounded-md' placeholder='Enter customer City....!' />
                                {errors.cityError && <p className='mt-3 text-[15px] text-red-500 font-semibold'>{errors.cityError}</p>}
                            </div>
                            <div>
                                <label >Date : </label>
                                <input type="date" value={formData.date} name='date' onInput={HandleErr} onChange={handleFormData} className='mt-2 text-[15px] text-black px-2 py-1 w-full border border-slate-500 rounded-md' />
                            </div>
                        </div>
                    </div>
                    <div className="pizzaPista-detail">
                        <h1 className='text-center text-[25px] font-semibold'>Enter Pizza And Pasta Detail</h1>
                        <div className='grid md:grid-cols-2 gap-5 my-4'>
                            <div>
                                <label>Numbers of Pizza : </label>
                                <input type="number" min={0} max={5} value={formData.pizza} ref={pizzaRef} name='pizza' onInput={HandleErr} onChange={handleFormData} className='text-[15px] w-full mt-2 px-2 py-1 border border-slate-500	rounded-md' placeholder='Enter Pizza Number....!' />
                                {errors.pizzaError && <p className='mt-3 text-[15px] text-red-500 font-semibold'>{errors.pizzaError}</p>}
                            </div>
                            <div>
                                <label>Numbers of Pasta : </label>
                                <input type="number" min={0} max={5} value={formData.pasta} ref={pastaRef} name='pasta' onInput={HandleErr} onChange={handleFormData} className='text-[15px] w-full mt-2 px-2 py-1 border border-slate-500	rounded-md' placeholder='Enter Pasta Number....!' />
                                {errors.pastaError && <p className='mt-3 text-[15px] text-red-500 font-semibold'>{errors.pastaError}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button value={formData.dialog} className='bg-blue-950  my-4  mx-auto px-7 py-[5px] text-[16px] rounded-md text-white  duration-300 hover:bg-blue-800'>Book Order</button>
                    </div>
                </form>
                <div className={`position: fixed bg-[url('https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?w=1060&t=st=1717148498~exp=1717149098~hmac=816ce226ca66d486205d2b5e6833dfdba7548423e7c7f99b6171d886bd30a2ff')]  bg-center  bg-cover bg-no-repeat inset-0 z-50  duration-500 grid place-items-center ease-in-out ${formData.dialog ? '-translate-y-0' : '-translate-y-full'}`}>
                    <DIaLog data={formData} toggleFun={setFormData} localDataPass={handleLocal} />
                    <div className='position: absolute inset-0 bg-gray-900/25 -z-10'></div>
                </div>
            </div>
            {storedData.length == 0 ? <h1 className='text-[18px] font-semibold text-red-700 px-5'>No Any Order........!</h1> : <PizzaPastaCard localData={storedData} deleteFun={handleDelete} />}
        </div>
    )
}
