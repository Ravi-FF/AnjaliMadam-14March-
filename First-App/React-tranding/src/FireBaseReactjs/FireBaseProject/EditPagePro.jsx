import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../../fireBaseConfig'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { indigo, orange, red } from '@mui/material/colors'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function EditPagePro() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const { uid } = useParams()
    const navigate = useNavigate()
    const [profile, setProfile] = useState("")
    useEffect(() => {
        const fatchAllData = async () => {
            const currentUser = await getDoc(doc(db, "formData", uid))
            setName(currentUser.data().name)
            setEmail(currentUser.data().email)
        }
        fatchAllData()
    }, [uid])
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "formData", uid), {
            'name': name
        })
        if (profile) {
            const storageRef = ref(storage, `profilePicture/${uid}`)
            console.log(storageRef);
            await uploadBytes(storageRef, profile)
            const downloadUrl = await getDownloadURL(storageRef)
            await updateDoc(doc(db, "formData", uid), {
                "profileImage": downloadUrl
            })
            setProfile(downloadUrl)
            console.log(downloadUrl);
        }
        navigate('/DeshboardPage', { replace: true })
    }
    return (
        <Box sx={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1458349726531-234ad56ba80f?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: "100vh",
            padding: "20px 0"
        }}>
            <Container>
                <Box sx={{ width: "40%", padding: "30px", margin: "50px auto", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", color: "#6A6A6A", borderRadius: "10px", background: "whitesmoke" }}>
                    <form onSubmit={handleSubmit} sx={{ flexBasis: "40%" }}>
                        <Typography component="h1" sx={{ fontSize: "30px", width: "100%", fontWeight: "bold", textAlign: "center", color: red[400] }}>Update Data</Typography>

                        <Box sx={{ margin: "25px 0" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Name</Typography>
                            <TextField value={name} onChange={(e) => setName(e.target.value)} type="text" sx={{
                                width: '100%',
                            }} autoComplete="true" label="Username" variant="outlined" />
                        </Box>

                        <Box sx={{ marginBottom: "25px" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Email Address</Typography>
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} type="email" sx={{ width: "100%" }} label="Email" disabled variant="outlined" />
                        </Box>

                        <Box sx={{ marginBottom: "25px" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Profile Image</Typography>
                            <TextField onChange={(e) => setProfile(e.target.files[0])} type="file" sx={{ width: "100%" }} variant="outlined" />
                        </Box>

                        <Box sx={{ textAlign: "end" }}>
                            <Button type='submit' fullWidth sx={{ background: indigo[900] }} variant="contained">Click here to Update Data</Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box>
    )
}
