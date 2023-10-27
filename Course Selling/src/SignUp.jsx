import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import '@fontsource/roboto/500.css';
import { useState } from 'react';
function SignUp () {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const sendData = () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        fetch('http://localhost:3000/admin/signup',{
            method : "POST",
            body: JSON.stringify({
                username : email,
                password : password
                }),
            headers: {"Content-type" : "application/json"}
        }).then((response) => response.json())
        .then((data) => localStorage.setItem("token", data.token))
        }

    return (
    <center>
        <div style={{
            padding:150
        }}>
        <Typography variant = "h6">Welcome to the Course Landing Page
        </Typography>

            <Card variant="outlined" style={{
                border:"1px solid black",
                width:500,
                padding: "30px",
                height:200
            }}>
                <div>

                {/* Username */}
                <TextField 

            onChange={
            (e) => {
                setEmail(e.target.value);
            }
            }

                fullWidth
                label="Email" 
                variant="outlined" />
                
                <br />  <br />
                
                {/* Password */}
                <TextField

                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                />
                
                <br /> <br />
                <Button 
                size="larger" 
                variant="contained"
                onClick = {sendData}> Sign Up </Button>
                
                </div>
            </Card>
        </div>
    </center>
    )
}

export default SignUp;