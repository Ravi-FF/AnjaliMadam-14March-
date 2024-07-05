import React, { useState, useEffect } from 'react';

export default function FetchData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const responseData = await response.json();
            setData(responseData);
        };

        fetchData();
    }, []);
    return (
        <div className='card-wrapper' style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
            {data.map((element, index) => {
                return <div className="card" key={index} style={{ width: "20%", border: "1px solid red", padding: "20px" }} >
                    <p><strong>id : </strong>{element.id}</p>
                    <p><strong>name : </strong>{element.name}</p>
                    <p><strong>username : </strong>{element.username}</p>
                    <p><strong>email : </strong>{element.email}</p>
                    <h3 style={{ textAlign: "center", padding: "10px 0" }}>address</h3>
                    <p><strong>street : </strong>{element.address.street}</p>
                    <p><strong>suite : </strong>{element.address.suite}</p>
                    <p><strong>city : </strong>{element.address.city}</p>
                    <p><strong>zipcode : </strong>{element.address.zipcode}</p>
                    <h3 style={{ textAlign: "center", padding: "10px 0" }}>geo</h3>
                    <p><strong>lat : </strong>{element.address.geo.lat}</p>
                    <p><strong>lng : </strong>{element.address.geo.lng}</p>
                    <p><strong>phone : </strong>{element.phone}</p>
                    <p><strong>website : </strong>{element.website}</p>
                    <h3 style={{ textAlign: "center", padding: "10px 0" }}>company</h3>
                    <p><strong>name : </strong>{element.company.name}</p>
                    <p><strong>catchPhrase : </strong>{element.company.catchPhrase}</p>
                    <p><strong>bs : </strong>{element.company.bs}</p>
                </div>
            })}
        </div>
    );
}
