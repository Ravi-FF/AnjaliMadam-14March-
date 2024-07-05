
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { auth, db, storage } from '../../fireBaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Avatar, Button, Card, CardActions, CardHeader, Paper, Tooltip, useTheme } from '@mui/material';
import { grey, indigo, pink, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Add, Delete, Logout, UploadFile } from '@mui/icons-material';
import { onAuthStateChanged } from 'firebase/auth';
import SingleProfile from './SingleProfile';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import DeleteEditPro from './DeleteEditPro';
import MainLoader from './MainLoader';
import ViewPostAdmin from './ViewPostAdmin';

export default function DeshboardPage() {
    const [fetchData, setFetchData] = useState()
    const [profile, setProfile] = useState("")
    const theme = useTheme()
    const [show, setShow] = useState(false)
    const [selectedCompo, setSelectedCompo] = useState(false)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchCurrentUser(user)
            }
        })
        const fetchCurrentUser = async (user) => {
            try {
                if (user) {
                    const currentData = await getDoc(doc(db, "formData", user.uid))
                    setLoader(false)
                    setFetchData(currentData.data());
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }, [])
    const handlesubmit = async (e) => {
        e.preventDefault()
        const user = auth.currentUser;
        if (user) {
            const storageRef = ref(storage, `profile/${user.uid}`);
            await uploadBytes(storageRef, profile);
            const downloadUrl = await getDownloadURL(storageRef);
            await updateDoc(doc(db, "formData", user.uid), {
                profileImage: downloadUrl
            });
            const userData = await getDoc(doc(db, "formData", user.uid));
            setFetchData(userData.data());
        }
    }
    console.log(profile);
    return (
        <>
            {loader == true ? <MainLoader></MainLoader> : <Box sx={{
                backgroundImage: "linear-gradient(to left, #9890e3 0%, #b1f4cf 100%)",
                height: "100vh",
                overflowY: 'auto',
                paddingTop: "50px"
            }}>
                <Box sx={{ border: "1px solid red" }}>
                    <AppBar position="fixed" sx={{ bgcolor: grey[50], color: "black" }} >
                        <Toolbar>
                            <Typography variant="h5" fontFamily="cursive" fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
                                Welcome {fetchData?.name}
                            </Typography>
                            <div>
                                <CardHeader
                                    sx={{ padding: "0" }}
                                    avatar={
                                        <IconButton onClick={() => setShow(true)}>
                                            {!fetchData?.profileImage ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {fetchData?.name.slice(" ")[0]}
                                            </Avatar> : <img src={fetchData?.profileImage} alt="" height="50px" width="50px" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                                        </IconButton>
                                    }
                                    title={fetchData?.name}
                                    subheader={fetchData?.email}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Card sx={{ zIndex: "5", maxWidth: 345, position: "Fixed", border: "1px solid gray", padding: "20px", top: !show ? "-500px" : "150px", left: "50%", transform: "translateX(-50%)", transition: "0.5s" }}>
                        <IconButton onClick={() => setShow(false)} sx={{ position: "absolute", right: "10px", top: "10px" }} >
                            <Delete />
                        </IconButton>
                        <Box sx={{ margin: "0 auto", height: "140px", width: "140px", borderRadius: "50%", overflow: "hidden" }}>
                            {!fetchData?.profileImage ? <Avatar sx={{ bgcolor: red[500], border: "1px solid blue", width: "100%", height: "100%", fontSize: "70px" }} aria-label="recipe">
                                {fetchData?.name.slice(" ")[0]}
                            </Avatar> : <img src={fetchData?.profileImage} alt="" height="100%" width="100%" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                        </Box>
                        <form onSubmit={handlesubmit}>
                            <Box sx={{ margin: "20px 0" }}>
                                <input onChange={(e) => setProfile(e.target.files[0])} style={{ width: "100%" }} type="file" />
                            </Box>
                            <CardActions sx={{ textAlign: "center" }}>
                                <Button startIcon={<UploadFile></UploadFile>} variant="contained" sx={{ color: "white", backgroundImage: "linear-gradient(to right, #f77062 0%, #fe5196 100%)", mx: "auto" }} type='submit' size="small">Upload Profile</Button>
                            </CardActions>
                        </form>
                    </Card>
                </Box>
                <Box width="90%" mx="auto" paddingTop="100px" marginTop="60px">
                    <Box width="25%" position="fixed">
                        <SingleProfile allData={{ fetchData, selectedCompo, setSelectedCompo }}></SingleProfile>
                    </Box>
                    <Box width="70%" marginLeft="auto">

                        <Box component={Paper} sx={{ borderRadius: "10px" }} padding="20px" boxShadow={theme.shadows[4]}>
                            {selectedCompo ? <ViewPostAdmin /> : <DeleteEditPro></DeleteEditPro>}
                        </Box>
                    </Box>
                </Box >
            </Box >}
        </>
    );
}