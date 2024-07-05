import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../fireBaseConfig'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import { Box, Button, CardActions, CircularProgress, Collapse, Divider, Grid, LinearProgress, Modal, Paper, TextField, Tooltip, useTheme } from '@mui/material';
import { Comment, Delete, ExpandMore, Favorite, FavoriteBorderOutlined } from '@mui/icons-material';

export default function ViewPostAdmin() {
    const [fetchAllPosts, setAllFetchPosts] = useState([]);
    const [postUser, setPostUser] = useState({})
    const [deleteWait, setDeleteWait] = useState(false)
    const [expanded, setExpanded] = React.useState([]);
    const theme = useTheme()
    const timeAgo = (timestamp) => {
        const now = Date.now();
        const seconds = Math.floor((now - timestamp) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return `${interval} years ago`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return `${interval} months ago`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return `${interval} days ago`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return `${interval} hours ago`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return `${interval} minutes ago`;
        }
        return `${Math.floor(seconds)} seconds ago`;
    }

    useEffect(() => {
        const fetahPosts = async () => {
            const allPosts = await getDocs(collection(db, "Post"))
            const user = auth.currentUser
            console.log(user.uid);
            const users = []
            allPosts.forEach((docs) => {
                const record = docs.data()
                users.push({
                    'id': docs.id,
                    'description': record.description,
                    "likes": record.likes || [],
                    "comments": record.comments || [],
                    'image': record.downloadUrl,
                    'userid': record.userID,
                    'createdAt': timeAgo(record.PostTime)
                })
            })
            setAllFetchPosts(users)
        }

        const fetchPostUser = async () => {
            const allusers = await getDocs(collection(db, "formData"))
            const user = {}
            allusers.forEach((docs) => user[docs.id] = docs.data())
            setPostUser(user)
        }
        fetahPosts()
        fetchPostUser()
    }, [])

    const handleDelete = async (userID) => {
        setDeleteWait(true)
        await deleteDoc(doc(db, "Post", userID))
        setAllFetchPosts(fetchAllPosts.filter((postID) => postID.id !== userID))
        setDeleteWait(false)
    }

    const handleExpandClick = (index) => {
        setExpanded(prevExpanded => {
            const newArray = [...prevExpanded];
            newArray[index] = !newArray[index];
            return newArray;
        });

    };
    return (
        <>
            <Typography color={grey[800]} variant='h6' display="inline-block" fontWeight="550" mb="20px" paddingBottom="5px" borderBottom="5px solid #fe5196" borderRadius="3px">ALL Posts</Typography>
            <Grid container spacing={3} justifyContent="center">
                {fetchAllPosts.length == 0 ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box> :
                    fetchAllPosts.map((post, i) => {
                        return <Grid item md={6} key={i} >
                            <Card sx={{
                                position: "relative",
                                bgcolor: grey[200], boxShadow: theme.shadows[6],
                                '& .MuiCardContent-root:last-child': {
                                    pb: "10px"
                                }
                            }}>
                                {
                                    deleteWait && <Box position="absolute" sx={{ width: '100%', inset: "0" }}>
                                        <LinearProgress />
                                    </Box>
                                }
                                <CardHeader
                                    sx={{
                                        padding: "0", justifyContent: "center", '& .MuiCardHeader-action': {
                                            alignSelf: "center"
                                        },
                                        paddingRight: "13px"
                                    }}
                                    avatar={
                                        <IconButton>
                                            {!postUser[post.userid]?.profileImage ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {postUser[post.userid]?.name.slice(" ")[0]}
                                            </Avatar> : <img src={postUser[post.userid]?.profileImage} alt="" height="40px" width="40px" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                                        </IconButton>
                                    }
                                    action={
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(post.id)}>
                                                <Delete sx={{ color: "red" }} />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    title={postUser[post.userid]?.name}
                                    subheader={post.createdAt}

                                />
                                <CardMedia>
                                    <img src={post.image} alt="" width="100%" height="200px" />
                                    <Typography p="5px 20px" variant="body2" color="text.secondary">
                                        {post.description}
                                    </Typography>
                                </CardMedia>
                                <CardActions sx={{ display: "flex", justifyContent: "space-between" }} >
                                    <Typography variant='body1'>Total likes : {post.likes?.length || 0}</Typography>
                                    <Button variant='contained' size='small' expand={expanded == i} endIcon={<ExpandMore />} onClick={() => handleExpandClick(i)}sx={{fontSize:"12px", fontWeight:"bold"}} >Show Commnets</Button>
                                </CardActions>
                                <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Box component={Paper} borderRadius={3} boxShadow={theme.shadows[5]} px={2}>
                                            {post.comments?.length > 0 ? post.comments.map((comment, index) => {
                                                return <div key={index}>
                                                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                                        <Box display={'flex'} alignItems={'center'} gap={2} my="10px">
                                                            <IconButton>
                                                                {!postUser[comment.userId]?.profileImage ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                                    {postUser[comment.userId]?.name.slice(" ")[0]}
                                                                </Avatar> : <img src={postUser[comment.userId]?.profileImage} alt="" height="40px" width="40px" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                                                            </IconButton>
                                                            <Box>
                                                                <Typography variant='body1' fontSize={13} fontWeight="bold">
                                                                    {postUser[comment?.userId]?.name}
                                                                </Typography>
                                                                <Typography variant='subtitle2'>
                                                                    {comment.text}
                                                                </Typography>
                                                            </Box>

                                                        </Box>
                                                        <Typography variant='caption'>
                                                            {timeAgo(comment.timestamp)}
                                                        </Typography>
                                                    </Box>
                                                    <Divider></Divider>
                                                </div>
                                            }) : <p>No Comments Found</p>
                                            }
                                        </Box>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>

        </>
    )
}
