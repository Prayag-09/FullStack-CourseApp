import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import '@fontsource/roboto/500.css';
import { useState } from 'react';
function SignIn() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    return (
    <center>
        <div style={{
            padding:150
        }}>
        <Typography variant = "h6">Welcome Back to the Course Landing Page
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

                onChange={
                    (e) => {
                        setPassword(e.target.value);
                    }
                }

                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password" 
                />
                
                <br /> <br />
                <Button size='larger' variant="contained"> SignIn </Button>
                
                </div>
            </Card>
        </div>
    </center>
    )
}

export default SignIn;