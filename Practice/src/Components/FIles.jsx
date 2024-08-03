import React, { useEffect, useState } from 'react';

export default function Files() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("images"))
        setFiles(data)
    }, [])

    const handleFileChange = (e) => {
        const fileArray = Object.values((e.target.files));
        const data = []
        fileArray.forEach((element) => {
            data.push(URL.createObjectURL(element))
        })
        localStorage.setItem("images", JSON.stringify(data))

        setFiles(data);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} /> <br />
            {files?.length === 0 ? "No Data Found" : files?.map((file, i) => {
                return <img key={i} src={file} alt={`uploaded file ${i}`} width="100" height="100" />;
            })}
            <button onClick={() => localStorage.clear()}>Clear localStorage</button>
        </div>
    );
}
