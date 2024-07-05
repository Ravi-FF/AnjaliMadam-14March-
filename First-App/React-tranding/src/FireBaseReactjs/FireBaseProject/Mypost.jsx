import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../fireBaseConfig';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import { Box, Button, CardActions, CircularProgress, Collapse, Divider, Grid, LinearProgress, Modal, Paper, TextField, Tooltip, useTheme } from '@mui/material';
import { Chat, Comment, Delete, ExpandMore, Favorite, FavoriteBorderOutlined } from '@mui/icons-material';

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

export default function Mypost() {
    const [post, setPost] = useState([]);
    const [postUsers, setPostUsers] = useState({});
    const [deleteWait, setDeleteWait] = useState(false);
    const [newPost, setNewPost] = useState("");
    const [open, setOpen] = React.useState(null);
    const [fetchAllPosts, setAllFetchPosts] = useState([]);
    const theme = useTheme();
    useEffect(() => {
        fetchPostUser();
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        const current_user = auth.currentUser;
        const querySnapshot = await getDocs(collection(db, "Post"));
        const fetchPost = [];

        querySnapshot.forEach((doc) => {
            const record = doc.data();
            if (record?.userID === current_user?.uid) {
                fetchPost.push({
                    'id': doc.id,
                    'title': record.title,
                    'description': record.description,
                    "likes": record.likes || [],
                    "Islike": record?.likes?.includes(current_user.uid) || false,
                    "comments": record.comments || [],
                    'image': record.downloadUrl,
                    'userid': record.userID,
                    'createdAt': timeAgo(record.PostTime)
                });
            }
        });

        setPost(fetchPost);
        setAllFetchPosts(fetchPost);
    };


    const fetchPostUser = async () => {
        const querySnapshot = await getDocs(collection(db, "formData"));
        const users = {};
        querySnapshot.forEach((doc) => {
            const record = doc.data();
            users[doc.id] = record;
        });

        setPostUsers(users);
    };


    const handleDelete = async (userID) => {
        setDeleteWait(true);
        await deleteDoc(doc(db, "Post", userID));
        setPost(post.filter((post) => post.id !== userID)); // Update 'post' state
        setAllFetchPosts(fetchAllPosts.filter((post) => post.id !== userID)); // Update 'fetchAllPosts' state
        setDeleteWait(false);
    };


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
        const user = auth.currentUser;
        const newCommentsObj = {
            postID: postID,
            text: newPost,
            userId: user.uid,
            timestamp: Date.now()
        };

        await updateDoc(doc(db, "Post", postID), {
            "comments": arrayUnion(newCommentsObj)
        });

        setNewPost("");
        const updatedPosts = fetchAllPosts.map((post) =>
            post.id === postID ? { ...post, "comments": [...post.comments, newCommentsObj] } : post
        );
        setAllFetchPosts(updatedPosts);
        handleClose();
    };


    const [expanded, setExpanded] = React.useState([]);
    const handleExpandClick = (index) => {
        setExpanded(prevExpanded => {
            const newArray = [...prevExpanded];
            newArray[index] = !newArray[index];
            return newArray;
        });
    };


    const deleteComment = async (postID, commentIndex) => {
        const currentPost = await getDoc(doc(db, "Post", postID));
        const currentComments = currentPost.data().comments || [];
        const filteredComments = currentComments.filter((_, index) => index !== commentIndex);

        await updateDoc(doc(db, "Post", postID), {
            "comments": filteredComments
        });

        const updatedPosts = fetchAllPosts.map((post) =>
            post.id === postID ? { ...post, "comments": filteredComments } : post
        );
        setAllFetchPosts(updatedPosts);
    };


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
        return `${Math.floor(seconds)} seconds ago`;
    };



    const handleClose = () => setOpen(null);
    return (
        <>
            <Typography color={grey[800]} variant='h6' display="inline-block" fontWeight="550" mb="20px" paddingBottom="5px" borderBottom="5px solid #fe5196" borderRadius="3px">My Posts</Typography>
            <Grid container spacing={3} justifyContent="center">
                {post.length === 0 ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <CircularProgress />
                    </Box>
                    :
                    post.map((post, i) => (
                        <Grid item md={8} key={i} >
                            <Card sx={{
                                position: "relative",
                                bgcolor: grey[200],
                                boxShadow: theme.shadows[6],
                                '& .MuiCardContent-root:last-child': {
                                    pb: "10px"
                                }
                            }}>
                                {deleteWait && (
                                    <Box position="absolute" sx={{ width: '100%', inset: "0" }}>
                                        <LinearProgress />
                                    </Box>
                                )}
                                <CardHeader
                                    sx={{
                                        padding: "0",
                                        justifyContent: "center",
                                        '& .MuiCardHeader-action': {
                                            alignSelf: "center"
                                        },
                                        paddingRight: "13px"
                                    }}
                                    avatar={
                                        <IconButton>
                                            {!postUsers[post?.userid]?.profileImage ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {postUsers[post?.userid]?.name.slice(" ")[0]}
                                            </Avatar> :
                                                <img src={postUsers[post?.userid]?.profileImage} alt="" height="40px" width="40px" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                                        </IconButton>
                                    }
                                    action={
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(post?.id)}>
                                                <Delete sx={{ color: "red" }} />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    title={postUsers[post?.userid]?.name}
                                    subheader={post?.createdAt}
                                />
                                <CardMedia>
                                    <img src={post?.image} alt="" width="100%" height="280px" />
                                    <Typography p="5px 20px" variant="body2" color="text.secondary">
                                        {post?.description}
                                    </Typography>
                                </CardMedia>
                                <CardActions sx={{ display: "flex", justifyContent: "space-between" }} >
                                    <Box>
                                        <IconButton onClick={() => handleLike(post?.id)}>
                                            {post?.Islike === true ? <Favorite sx={{ color: red[500] }} /> : <FavoriteBorderOutlined />}
                                        </IconButton>
                                        <Typography variant='body2' component="span">{post?.likes?.length || 0}</Typography>

                                        <IconButton onClick={() => setOpen(i)} sx={{ marginLeft: "10px" }}>
                                            <Comment></Comment>
                                        </IconButton>
                                        <Modal
                                            open={open === i}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <TextField
                                                    size='small'
                                                    value={newPost}
                                                    onChange={(e) => setNewPost(e.target.value)}
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Type Your Comment"
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleComments(post?.id)}
                                                    sx={{ marginLeft: "auto", mt: "20px" }}
                                                >
                                                    Add Comment
                                                </Button>
                                            </Box>
                                        </Modal>
                                    </Box>
                                    <IconButton
                                        expand={expanded[i]}
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
                                            {post.comments?.length > 0 ? post.comments.map((comment, index) => (
                                                <div key={index}>
                                                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                                        <Box display={'flex'} gap={2} my="10px">
                                                            <IconButton>
                                                                {!postUsers[comment.userId]?.profileImage ? <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                                    {postUsers[comment.userId]?.name.slice(" ")[0]}
                                                                </Avatar> :
                                                                    <img src={postUsers[comment.userId]?.profileImage} alt="" height="40px" width="40px" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                                                            </IconButton>
                                                            <Box>
                                                                <Typography variant='body1' fontSize={13} fontWeight="bold">
                                                                    {postUsers[comment?.userId]?.name}
                                                                </Typography>
                                                                <Typography variant='subtitle2'>
                                                                    {comment.text}
                                                                </Typography>
                                                                <Typography variant='caption'>
                                                                    {timeAgo(comment.timestamp)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <IconButton onClick={() => deleteComment(post.id, index)}>
                                                            <Delete ></Delete>
                                                        </IconButton>
                                                    </Box>
                                                    <Divider></Divider>
                                                </div>
                                            )) : <p>No Comments Found</p>}
                                        </Box>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}
