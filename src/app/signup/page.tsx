'use client'

import { Typography, Card, TextField, Button } from "@mui/material"
import { useState } from "react"
import axios from "axios"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/signup", {
        username,
        email,
        password
      });

      // Assuming you want to handle the response or do something with it
      console.log("Signup response:", response.data);

      // Assuming you want to store the token in local storage
      localStorage.setItem("token", response.data.token);

      // Add any other actions you want to perform after successful signup
    } catch (error) {
      // Handle errors here
      console.error("Signup failed:", error);
    }
  }

  return (
    <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div>
            
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
            <TextField
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    fullWidth={true}
                    label="Username"
                    variant="outlined"
                />
                <br />
                <br />
                <TextField
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>

                <Button 
                size={"large"}
                variant="contained"
                onClick={handleSignup}
                >Signup</Button>
            </Card>
        </div>
    </div>
  )
}

export default Signup;