import { Email, Logout } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText, Paper, Typography, useTheme } from '@mui/material'
import { grey, lightBlue, red } from '@mui/material/colors'
import React, { useState } from 'react'
import { auth } from '../../fireBaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function SingleProfile({ allData }) {
    const navigate = useNavigate()
    const handlesignOut = async () => {
        await signOut(auth)
        navigate("/", { replace: true })
    }
    const { fetchData, selectedCompo, setSelectedCompo } = allData
    const theme = useTheme();
    return (
        <Box component={Paper} position="relative" textAlign="center" padding="60px 25px 25px 25px" sx={{ borderRadius: "10px" }} boxShadow={theme.shadows[4]} >
            <Box sx={{ position: "absolute", width: "160px", height: "160px", borderRadius: "10px", overflow: "hidden", transform: "translatex(-50%)", left: "50%", top: "-110px" }}>
                {!fetchData?.profileImage ? <Avatar sx={{ backgroundImage: "linear-gradient(to left, #09203f 0%, #537895 100%)", width: "100%", height: "100%", fontSize: "70px" }} aria-label="recipe">
                    {fetchData?.name.slice(" ")[0]}
                </Avatar> : <img src={fetchData?.profileImage} alt="" height="100%" width="100%" style={{ objectFit: "cover" }} />}
            </Box>
            <Typography variant='h5' marginBottom={1} fontWeight="bold">
                {fetchData?.name}
            </Typography>
            <Button size='small' variant='contained' startIcon={<Email sx={{ color: lightBlue[900] }}></Email>} sx={{
                bgcolor: grey[50], color: "black", fontSize: "14px", '&:hover': {
                    bgcolor: grey[300]
                }
            }}>
                {fetchData?.email}
            </Button >
            <Paper marginY={3} component={Box} sx={{ bgcolor: grey[50], overflow: "hidden" }}>
                <List sx={{
                    py: "0", border: "1px solid", borderColor: "divider"
                }}>
                    <ListItem onClick={() => setSelectedCompo(false)} sx={{
                        transition: "0.5s",
                        cursor: "pointer", ...(!selectedCompo && { bgcolor: grey[400] }), '&:hover': {
                            bgcolor: grey[300]
                        }
                    }}>
                        <ListItemText primary="All Users" />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem onClick={() => setSelectedCompo(true)} sx={{
                        transition: "0.5s",
                        cursor: "pointer", ...(selectedCompo && { bgcolor: grey[400] }), '&:hover': {
                            bgcolor: grey[300]
                        }
                    }}>
                        <ListItemText primary="All Posts" />
                    </ListItem>
                </List>
            </Paper>
            <Button variant='contained' sx={{ color: "white", backgroundImage: "linear-gradient(to right, #f77062 0%, #fe5196 100%)" }} startIcon={<Logout></Logout>} onClick={() => handlesignOut()}>Log Out</Button>
        </Box >
    )
}
