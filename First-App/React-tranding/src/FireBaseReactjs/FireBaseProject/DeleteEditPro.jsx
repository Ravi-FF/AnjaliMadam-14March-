import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../fireBaseConfig'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Collapse, Container, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import { AllInbox, AppBlocking, Delete, Edit, Home, KeyboardBackspace, MoreVert } from '@mui/icons-material'
import { green, grey, pink, red } from '@mui/material/colors'
import { Link, useNavigate } from 'react-router-dom'


export default function DeleteEditPro() {
    const [allData, setAllData] = useState([])
    const navigate = useNavigate()
    const theme = useTheme()
    useEffect(() => {
        const fatchAllData = async () => {
            try {
                const QuerySnapshots = await getDocs(collection(db, "formData"))
                const users = []
                QuerySnapshots.forEach((doc) => users.push({ uid: doc.id, ...doc.data() }))
                setAllData(users)
            } catch (error) {
                console.error(error.message);
            }
        }
        fatchAllData()
    }, [])
    console.log(allData);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleDelete = async (docID) => {
        await deleteDoc(doc(db, "formData", docID))
        const newArray = await allData.filter(user => user.uid !== docID)
        setAllData(newArray)
        setAnchorEl(null);
    };
    const handleEdit = (docID) => {
        navigate(`/EditPageProject/${docID}`,{replace:true})
        setAnchorEl(null);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Typography color={grey[800]} variant='h6' display="inline-block" fontWeight="550" mb="20px" paddingBottom="5px" borderBottom="5px solid #fe5196" borderRadius="3px">ALL USERS</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[4] }}>
                <Table sx={{
                    '& .MuiTableCell-root': {
                        paddingY: '5px',
                        textAlign: "center"
                    }
                }}>
                    <TableHead sx={{ bgcolor: grey[300] }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>User Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allData.length == "0" ?
                            <TableRow>
                                <TableCell sx={{ textAlign: "center" }} colSpan={5}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>

                            : allData.map(({ uid, name, email, profileImage }, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>{profileImage ? <img src={profileImage} style={{ objectFit: "cover", marginX: "auto", borderRadius: "100%" }} width="55px" height="55px"></img> :
                                        <Avatar sx={{ mx: "auto", backgroundImage: "linear-gradient(to left, #09203f 0%, #537895 100%)", width: "55px", height: "55px", borderRadius: "100%", fontSize: "25px" }} aria-label="recipe">
                                            {name.slice(" ")[0]}
                                        </Avatar>
                                    }</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} aria-label="settings">
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={() => handleDelete(uid)}>
                                            {/* <ListItemIcon>
                                                <ContentCut fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Cut</ListItemText> */}
                                            Delete
                                        </MenuItem>
                                        <MenuItem onClick={() => handleEdit(uid)}>Edit</MenuItem>
                                    </Menu>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ >
    )
}