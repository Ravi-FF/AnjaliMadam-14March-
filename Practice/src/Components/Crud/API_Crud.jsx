import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function API_Crud() {
    const [allData, setAllData] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });
    const [editUser, setEditUser] = useState(null);
    const API_URL = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localData = localStorage.getItem('usersData');
                if (localData) {
                    setAllData(JSON.parse(localData));
                } else {
                    const response = (await axios.get(API_URL)).data;
                    setAllData(response);
                    localStorage.setItem('usersData', JSON.stringify(response));
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setAllData(prevData => {
                const updatedData = prevData.filter(item => item.id !== id);
                localStorage.setItem('usersData', JSON.stringify(updatedData));
                return updatedData;
            });
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };

    const handleAdd = async () => {
        try {
            const response = (await axios.post(API_URL, newUser)).data;
            setAllData(prevData => {
                const updatedData = [...prevData, response];
                localStorage.setItem('usersData', JSON.stringify(updatedData));
                return updatedData;
            });
            setNewUser({ name: '', username: '', email: '' }); // Clear form
        } catch (error) {
            console.error('Error adding item:', error.message);
        }
    };

    const handleEdit = async () => {
        if (!editUser) return;

        try {
            const response = (await axios.put(`${API_URL}/${editUser.id}`, editUser)).data;
            setAllData(prevData => {
                const updatedData = prevData.map(item =>
                    item.id === response.id ? response : item
                );
                localStorage.setItem('usersData', JSON.stringify(updatedData));
                return updatedData;
            });
            setEditUser(null); // Clear edit form
        } catch (error) {
            console.error('Error updating item:', error.message);
        }
    };

    return (
        <div>
            <h1>API CRUD Operations</h1>

            <div>
                <h2>Add New User</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                />
                <button onClick={handleAdd}>Add User</button>
            </div>

            {editUser && (
                <div>
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editUser.name}
                        onChange={(e) => setEditUser(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={editUser.username}
                        onChange={(e) => setEditUser(prev => ({ ...prev, username: e.target.value }))}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editUser.email}
                        onChange={(e) => setEditUser(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <button onClick={handleEdit}>Update User</button>
                </div>
            )}

            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allData.length === 0 ? <tr><td colSpan="6">Data is loading</td></tr> : allData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.username}</td>
                            <td>{row.email}</td>
                            <td><button onClick={() => handleDelete(row.id)}>Delete</button></td>
                            <td><button onClick={() => setEditUser(row)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
