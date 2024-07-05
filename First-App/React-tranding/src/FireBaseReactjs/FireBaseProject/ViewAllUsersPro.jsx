import { KeyboardBackspace } from '@mui/icons-material'
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { grey, pink } from '@mui/material/colors'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../fireBaseConfig'

export default function ViewAllUsersPro() {
    const [data, setAllData] = useState([])
    const [userData, setUserData] = useState({})
    useEffect(() => {
        fetchAllData()
        fetchUser()
    }, [])
    const fetchAllData = async () => {
        const fetchRecords = await getDocs(collection(db, "Post"))
        const SingleRecord = [];
        fetchRecords.forEach((doc) => {
            const record = doc.data()
            SingleRecord.push({
                "title": record.title,
                "description": record.description,
                "downloadUrl": record.downloadUrl,
                "userID": record.userID
            })
        })
        setAllData(SingleRecord)
    }
    const fetchUser = async () => {
        const querySnapshots = await getDocs(collection(db, "formData"))
        // console.log(querySnapshots[0]);
        const user = {}
        querySnapshots.forEach((docs) => {
            const recond = docs.data()
            user[docs.id] = recond.name
        })
        setUserData(user)
    }
    console.log(userData);
    console.log(data);
    console.log(userData[data[0].userID]);
    return (
        <Box sx={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1462524500090-89443873e2b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: "100vh",
            padding: "20px 0"
        }}>
            <Container>
                <Typography variant="h4" align='center' color="white" fontWeight="bold">View All User Posts</Typography>
                <Link to="/">
                    <Button sx={{
                        margin: "20px 0", bgcolor: pink[500],
                        '&:hover': {
                            bgcolor: pink[600]
                        },
                        '& .MuiButton-startIcon': {
                            transition: "0.5s"
                        },
                        '&:hover .MuiButton-startIcon': {
                            transform: 'translateX(-5px)', // move icon left on hover
                        },
                    }
                    } startIcon={<KeyboardBackspace></KeyboardBackspace>} variant='contained'>Back to Home</Button>
                </Link>
                <TableContainer component={Paper} sx={{ textAlign: "center" }} >
                    <Table sx={{
                        '& .MuiTableCell-root': {
                            padding: "8px 10px",
                            textAlign: "center",
                        }
                    }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: grey[300] }}>
                                <TableCell sx={{ fontWeight: "bold" }} >ID</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} >TITLE</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} >Image</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} >DESCRIPTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length == 0 ? <TableRow>
                                <TableCell>Data not Found</TableCell>
                            </TableRow> : data.map(({ title, description, downloadUrl }, i) => {
                                return <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{title}</TableCell>
                                    <TableCell>{downloadUrl ? <img src={downloadUrl} width={40}></img> : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLe8dJY2sLjUqjw_mXazIv_L_CHH9XShihg&s' width={40}></img>}</TableCell>
                                    <TableCell>{description}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box >
    )
}
