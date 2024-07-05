
import { Add, AllInbox, Cancel } from '@mui/icons-material'
import { Box, Button, Container, Grid, LinearProgress, TextField, TextareaAutosize, Typography } from '@mui/material'
import { blue, lightBlue, orange, red } from '@mui/material/colors'
import React, { useState } from 'react'
import { auth, db, storage } from '../../fireBaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function AddNewPost() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageLink, setImageLink] = useState("")
    const navigate = useNavigate("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = auth.currentUser
            const storageRef = ref(storage, `Post/${user.uid}/${Date.now()}`)
            console.log(storageRef);
            await uploadBytes(storageRef, imageLink)
            const downloadUrl = await getDownloadURL(storageRef)
            await setDoc(doc(db, "Post", `${Date.now()}`), {
                "title": title,
                "description": description,
                "downloadUrl": downloadUrl,
                "userID": user.uid,
                'PostTime': Date.now()
            })
            setTitle("")
            setDescription("")
            setImageLink("")
            navigate("/Profile", { replace: true })
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Box sx={{
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <Box sx={{ position: "relative", overflow: "hidden", width: "30%", padding: "30px", margin: "50px auto", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", color: "#6A6A6A", borderRadius: "10px", background: "whitesmoke" }}>
                <form onSubmit={handleSubmit} sx={{ flexBasis: "40%" }}>
                    <Typography component="h1" sx={{ fontSize: "30px", width: "100%", fontWeight: "bold", textAlign: "center", color: blue[700] }}>Add New Post</Typography>

                    <Box sx={{ margin: "25px 0" }}>
                        <TextField required value={title} onChange={(e) => setTitle(e.target.value)} type="text" sx={{
                            width: '100%',
                        }} autoComplete="true" label="Title" variant="outlined" />
                    </Box>

                    <Box sx={{ marginBottom: "25px" }}>
                        <TextField required value={description} onChange={(e) => setDescription(e.target.value)} type="text" sx={{ width: "100%" }} label="Enter Your Description" variant="outlined" multiline rows={3} />
                    </Box>

                    <Box sx={{ marginBottom: "25px" }}>
                        <TextField autoComplete="true" required onChange={(e) => setImageLink(e.target.files[0])} type="file" variant="outlined" fullWidth />
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item md={6}>
                            <Button type='submit' fullWidth sx={{ bgcolor: blue[900] }} startIcon={<Add></Add>} variant="contained"> Add Post</Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button type='button' fullWidth sx={{
                                bgcolor: red[600], "&:hover": {
                                    bgcolor: red[800]
                                }
                            }} startIcon={<Cancel></Cancel>} variant="contained" onClick={() => navigate("/Profile", { replace: true })}> Cancle</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    )
}
