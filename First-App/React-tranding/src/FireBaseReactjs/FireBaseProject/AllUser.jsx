import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../fireBaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'
import { Message } from '@mui/icons-material'

export default function AllUser() {
    const [FetchRecord, setFetchRecord] = useState("")
    const [users, setUsers] = useState([])
    const [currentId, setUid] = useState(null)
    const theme = useTheme()
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchCurrentUser(user)
            }
        })
        const fetchCurrentUser = async (user) => {
            try {
                if (user) {
                    const currentData = await getDoc(doc(db, "formData", user.uid))
                    setFetchRecord(currentData.data());
                    setUid(currentData.id)
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }, [])
    useEffect(() => {
        if (currentId) {
            fetchAllusers()
        }
    }, [currentId])
    const fetchAllusers = async () => {
        const QuerySnapshots = await getDocs(collection(db, "formData"))
        const allusersData = []
        QuerySnapshots.forEach((doc) => {
            if (doc.id !== currentId) {
                allusersData.push({ uid: doc.id, ...doc.data() })
            }
        })
        setUsers(allusersData)
    }
    return (
        <Box sx={{ backgroundImage: "linear-gradient(to right, #6991c7   0%, #a3bded 100%)", height: "100vh" }}>
            <Container>
                <Typography variant='h4' py={4} textAlign="center">logged in by : {FetchRecord ? FetchRecord.name : "loading"} </Typography>
                <TableContainer component={Paper} sx={{ textAlign: "center", boxShadow: theme.shadows[4] }} >
                    <Table sx={{
                        '& .MuiTableCell-root': {
                            padding: "8px 10px",
                            textAlign: "center",
                        },
                    }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: grey[300] }}>
                                <TableCell sx={{ fontWeight: "bold" }} >Sr. NO</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} >Image</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} >Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} >Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length == "0" ? <TableRow>
                                <TableCell>Data not Found</TableCell>
                            </TableRow> : users.map((user, index) => {
                                return <TableRow key={user.uid}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell><IconButton>
                                        {!user.profilePicture ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {user.name.slice(" ")[0]}
                                        </Avatar> : <img src={user.profilePicture} alt="" height="40px" width="40px" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                                    </IconButton></TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => navigate(`/ChatScreen/${user.uid}`, { replace: true })} size='small' sx={{ bgcolor: green[700] }} endIcon={<Message></Message>} variant='contained'>Message</Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}
