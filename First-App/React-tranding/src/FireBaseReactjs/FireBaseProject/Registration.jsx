import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db } from '../../fireBaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Registration() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [myError, setError] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name == "" || email == "" || password == "") {
            alert("All Fields must be Required....!")
            return;
        }
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user.uid;

            await setDoc(doc(db, "formData", user), {
                "name": name,
                "email": email,
            });
            setEmail("")
            setName("")
            setPassword("")
            navigate("/loginPage", { replace: true })
        } catch (error) {
            setError(error.message)
        }

    }
    return (
        <Box sx={{
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)))',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: "100vh",
            padding: "20px 0"
        }}>
            <Container>
                <Box boxShadow={theme.shadows[2]} border={"2px solid lightgrey"} sx={{ width: "40%", padding: "30px", margin: "50px auto", color: "#6A6A6A", borderRadius: "10px", background: "whitesmoke" }}>
                    <form onSubmit={handleSubmit} sx={{ flexBasis: "40%" }}>
                        <Typography component="h1" sx={{ fontSize: "30px", width: "100%", fontWeight: "bold", textAlign: "center", color: "#863dd9" }}>Create An Account</Typography>
                        {myError && <Typography component="h1" sx={{ fontSize: "18px", textAlign: "center", color: "red" }}>{myError}</Typography>}


                        <Box sx={{ margin: "25px 0" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Name</Typography>
                            <TextField value={name} size='small' onChange={(e) => setName(e.target.value)} type="text" sx={{
                                width: '100%',
                            }} autoComplete="true" label="Username" variant="outlined" />
                        </Box>

                        <Box sx={{ marginBottom: "25px" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Email Address</Typography>
                            <TextField value={email} size='small' onChange={(e) => setEmail(e.target.value)} type="email" sx={{ width: "100%" }} label="Email" variant="outlined" />
                        </Box>

                        <Box sx={{ marginBottom: "25px" }}>
                            <Typography component="p" sx={{ marginBottom: "7px" }} >Password</Typography>
                            <TextField value={password} size='small' autoComplete="true" onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} sx={{ width: "100%" }} label="Password..!"
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

                        <Box sx={{ textAlign: "end" }}>
                            <Button type='submit' fullWidth sx={{ background: "#863dd9" }} variant="contained">Sign Up</Button>
                        </Box>


                        <Typography sx={{ marginTop: "15px", textAlign: "center" }} component="">Already Have an Account ? <Typography sx={{
                            cursor: "pointer", "&:hover": {
                                textDecoration: "underline"
                            }
                        }} color="#863dd9" component="span" onClick={() => navigate("/loginPage", { replace: true })} >Login</Typography> </Typography>

                        <Typography sx={{ marginTop: "10px", textAlign: "center" }} component="p">Admin <Typography sx={{
                            cursor: "pointer", "&:hover": {
                                textDecoration: "underline"
                            }
                        }} color="#863dd9" component="span" onClick={() => navigate("/AdminLogin", { replace: true })} >Login</Typography> </Typography>
                    </form>
                </Box>
            </Container>
        </Box>
    )
}
