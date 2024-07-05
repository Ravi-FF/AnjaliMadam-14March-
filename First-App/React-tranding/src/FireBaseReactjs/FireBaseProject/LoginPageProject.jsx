import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db } from '../../fireBaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
export default function LoginPageProject() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [myError, setMyError] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == "" || password == "") {
            alert("All Fields must be Required....!")
            return;
        }
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user.uid;
            const fetchData = await getDoc(doc(db, "formData", user));
            if (fetchData.exists) {
                navigate("/Profile", { replace: true })
            } else {
                console.log("Document does not exist");
            }
        } catch (error) {
            setMyError(error.message)
        }
    }
    return (
        <Box>
            <Container>
                <Box boxShadow={theme.shadows[10]} sx={{ display: "flex", justifyContent: "space-between", padding: "50px", paddingBottom: "60px", background: "url('https://www.yudaah.com/demo/free-webapp-login-page-html-template/assets/images/bg.png')", backgroundSize: "cover", margin: "80px 0", color: "#6A6A6A" }}>
                    <form onSubmit={handleSubmit} style={{ flexBasis: "40%" }}>
                        <Typography component={"h1"} sx={{ fontSize: "40px", width: "100%", fontWeight: "bold", textAlign: "start" }}>Login in</Typography>
                        <Typography sx={{ marginBottom: "25px" }} component="p">Don't Have an Account? <Typography sx={{ cursor: "pointer" }} color="#863dd9" component="span" onClick={() => navigate("/", { replace: true })}>Create your Account</Typography> </Typography>
                        {myError && <Typography component={"h1"} sx={{ fontSize: "18px", color: "red" }}>{myError}</Typography>}

                        <Box sx={{ marginBottom: "25px" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Email Address</Typography>
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} type="email" sx={{ width: "100%" }} label="Email" variant="outlined" />
                        </Box>

                        <Box sx={{ marginBottom: "25px" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Password</Typography>
                            <TextField value={password} autoComplete="true" onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} sx={{ width: "100%" }} label="Password..!"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} variant="outlined" />
                        </Box>
                        <Typography component="p">
                            Forget Password ?
                        </Typography>
                        <Box sx={{ textAlign: "end" }}>
                            <Button type='submit' sx={{ width: "fit-content", borderRadius: "20px", background: "#863dd9", marginTop: "30px" }} variant="contained" >Sign in</Button>
                        </Box>

                    </form>
                    <Box sx={{ color: "white", textAlign: "end" }}>
                        <Typography sx={{ fontSize: "50px", fontWeight: "bold" }} component="h1">
                            Welcome Back
                        </Typography>
                        <Typography sx={{ fontSize: "17px", marginBottom: "30px", letterSpacing: "1.5px" }} component="p">
                            Simply Create your account by <br />
                            clicking the Signup Button
                        </Typography>
                        <Button variant="outlined" sx={{ color: "white", borderRadius: "20px", borderColor: "white" }} onClick={() => navigate("/", { replace: true })}>Sign Up</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
