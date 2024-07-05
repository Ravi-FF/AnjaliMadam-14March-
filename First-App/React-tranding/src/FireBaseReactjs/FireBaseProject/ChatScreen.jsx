/* eslint-disable no-unused-vars */
// import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../fireBaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { Box, Button, Container, IconButton, Paper, TextField, Typography, useTheme } from '@mui/material';
import { KeyboardArrowLeft, Send } from '@mui/icons-material';


export default function ChatScreen() {
    const { uid } = useParams();

    const [messageInput, setMessage] = useState();
    const [selectedUser, setSelectedUser] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');

    const [messagesAll, setMessagesAll] = useState([]);
    const [currentuid, setCurrentUid] = useState();
    const theme = useTheme()
    const navigate = useNavigate()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUid(user.uid);
            }
            else {
                setCurrentUid(null); // Handle if user is logged out
            }
        });

        return unsubscribe;
    }, []);


    useEffect(() => {
        fetchUserNames();
        fetchMessages();
    }, [currentuid, uid])

    const sendMessage = async () => {
        if (!messageInput.trim()) return; // Prevent sending empty messages

        const newMessage = {
            senderId: auth.currentUser.uid,
            receiverId: uid,
            content: messageInput.trim(),
            timestamp: serverTimestamp(),

        };

        await addDoc(collection(db, 'Chats'), newMessage);
        setMessage("");
        fetchMessages();
    }


    const fetchUserNames = async () => {
        const selectedUserDoc = await getDoc(doc(db, 'formData', uid));
        console.log(selectedUserDoc.data());
        if (selectedUserDoc.exists()) {
            console.log(selectedUserDoc.data());
            setSelectedUser(selectedUserDoc.data());
        }

        // Fetch current user's name (logged-in user)
        const currentUserDoc = await getDoc(doc(db, 'formData', auth.currentUser.uid));
        if (currentUserDoc.exists()) {
            setCurrentUserName(currentUserDoc.data().name);
            setCurrentUid(auth.currentUser.uid);
        }
    };

    const fetchMessages = async () => {
        if (!currentuid || !uid) return; // Ensure currentuid and uid are defined
        const q = query(
            collection(db, 'Chats'),
            where('senderId', 'in', [currentuid, uid]),
            where('receiverId', 'in', [currentuid, uid]),
            orderBy('timestamp', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const fetchMessages = [];

        querySnapshot.forEach((doc) => {
            fetchMessages.push(doc.data());
        })

        setMessagesAll(fetchMessages);
    }

    return (
        <Box sx={{
            position: 'relative',
            height: '100vh',
            backgroundImage: `url(https://plus.unsplash.com/premium_photo-1719592940136-1915157d096f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
        }}>
            <Box
                sx={{
                    position: 'absolute',
                    content: '""',
                    zIndex: 1,
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
                }}
            />

            <Container sx={{ position: "relative", zIndex: 2 }}>
                <Typography variant='h3' color="white" py={3} textAlign={'center'}>chat screen</Typography>
                <Typography color="white" variant='h6'>Logged in as: {currentUserName}</Typography>
                <Box component={Paper} p={2} border="1px solid lightgrey" boxShadow={theme.shadows[3]} maxWidth="600px" mx="auto" maxHeight="350px" overflowY="scroll" >
                    <Box bgcolor="#075E55" paddingRight="10px" color="white" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <IconButton onClick={() => navigate("/allGuestUser", { replace: true })}>
                            <KeyboardArrowLeft sx={{ color: "white" }}></KeyboardArrowLeft>
                        </IconButton>
                        <Typography variant='body2'>{selectedUser.name}</Typography>
                        <Typography variant='body2'>{selectedUser.email}</Typography>
                    </Box>
                    {messagesAll.map((message, index) => (
                        <Box key={index}
                            sx={{ textAlign: message.senderId === auth.currentUser.uid ? "right" : "left", margin: "15px 0" }}>
                            <Typography variant='body2' display="inline-block" sx={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: message.senderId === auth.currentUser.uid ? "rgb(135,236,194)" : "whitesmoke", color: "black" }}>
                                {message.content}
                            </Typography>
                        </Box>
                    ))}
                    <Box display={'flex'} justifyContent={'center'} gap={"15px"} alignItems={'center'}>
                        <TextField variant="outlined" size='small' label="Type Your Message Here.....!" sx={{ fontSize: "15px", my: "10px" }} fullWidth value={messageInput} onChange={(e) => setMessage(e.target?.value)}>
                        </TextField>
                        <Box textAlign={'center'}>
                            <IconButton size='small' onClick={sendMessage} sx={{
                                bgcolor: "#075E55", color: "white", '&:hover': {
                                    color: "black"
                                }
                            }}>
                                <Send></Send>
                            </IconButton>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}