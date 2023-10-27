import { Typography,Button } from "@mui/material";


function AppBar () {

    return (
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            padding:5 
        }}>
        
            <div>
            <Typography variant={"h6"}>Courses</Typography>
            </div>

            <div style={{
                display:"flex"
            }}>
                <div style={{
                    marginRight:10
                }}>
            <Button variant="contained"> Sign In</Button>
                </div>
                <div>
                <Button variant="contained"> Sign Up</Button>
                </div>
            
            </div>
        </div>
    )
}

export default AppBar;


 