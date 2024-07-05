import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../fireBaseConfig'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import { Box, Button, CardActions, CircularProgress, Collapse, Divider, Grid, Modal, Paper, TextField, Tooltip, useTheme } from '@mui/material';
import { Comment, Delete, ExpandMore, Favorite, FavoriteBorderOutlined } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "8px",
    boxShadow: 24,
    p: 3,
    textAlign: "center"
};
export default function ViewAllPosts() {
    const [fetchAllPosts, setAllFetchPosts] = useState([]);
    const [postUser, setPostUser] = useState({})
    const theme = useTheme()
    const [newPost, setNewPost] = useState("")
    const [open, setOpen] = React.useState(null);
    const handleOpen = (id) => {
        setOpen(id)
    }

    const handleClose = () => setOpen(null);

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
            const users = []
            allPosts.forEach((docs) => {
                const record = docs.data()
                users.push({
                    'id': docs.id,
                    'title': record.title,
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
        await deleteDoc(doc(db, "Post", userID))
        setAllFetchPosts(fetchAllPosts.filter((postID) => postID.id !== userID))
    }

    const handleLike = async (postId) => {
        const user = auth.currentUser;
        const postRef = doc(db, 'Post', postId);
        const postDoc = await getDoc(postRef);

        const postData = postDoc.data();
        let likesArray = postData.likes || [];

        if (likesArray.includes(user.uid)) {
            likesArray = likesArray.filter((uid) => uid !== user.uid);
        } else {
            likesArray.push(user.uid);
        }
        await updateDoc(postRef, { likes: likesArray });
        setAllFetchPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, likes: likesArray } : post
            )
        );
    };
    const handleComments = async (postID) => {
        const user = auth.currentUser

        const newCommentsObj = {
            postID: postID,
            text: newPost,
            userId: user.uid,
            timestamp: Date.now()
        }
        await updateDoc(doc(db, "Post", postID), {
            "comments": arrayUnion(newCommentsObj)
        })
        setNewPost("");
        const updateCommentPost = await fetchAllPosts.map((post) => post.id === postID ? { ...post, "comments": [...post.comments, newCommentsObj] } : post)
        setAllFetchPosts(updateCommentPost)
        handleClose()
    }
    const [expanded, setExpanded] = React.useState([]);
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
                                    <Box>
                                        <IconButton onClick={() => handleLike(post.id)}>
                                            {post.likes && post.likes.includes(auth.currentUser.uid) ? (
                                                <Favorite sx={{ color: red[500] }} />
                                            ) : (
                                                <FavoriteBorderOutlined />
                                            )}
                                        </IconButton>

                                        <Typography variant="span">{post.likes.length}</Typography>
                                        <Tooltip title="Comment">
                                            <IconButton sx={{ marginLeft: "10px" }}>
                                                <Comment onClick={() => handleOpen(i)}></Comment>
                                            </IconButton>
                                        </Tooltip>
                                        <Modal
                                            open={open == i}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <TextField size='small' value={newPost} onChange={(e) => setNewPost(e.target.value
                                                )} variant="outlined" fullWidth label="Type Your Commnet"></TextField>
                                                <Button variant="contained" onClick={() => handleComments(post.id)} sx={{ marginLeft: "auto", mt: "20px" }}>Add Comment</Button>
                                            </Box>
                                        </Modal>
                                    </Box>
                                    <IconButton
                                        expand={expanded == i}
                                        onClick={() => handleExpandClick(i)}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMore />
                                    </IconButton>
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
