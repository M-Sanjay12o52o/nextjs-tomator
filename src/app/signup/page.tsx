'use client'

import { Typography, Card, TextField, Button } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React, {useState, useEffect} from "react"

const Signup = () => {
  // const [username, setUsername] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);

      // Assuming you want to handle the response or do something with it
      console.log("Signup Success:", response.data);

      // Assuming you want to store the token in local storage
      localStorage.setItem("token", response.data.token);

      router.push("/signin");


      // Add any other actions you want to perform after successful signup
    } catch (error: any) {
      // Handle errors here
      console.error("Signup failed:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

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
                        // setUsername(event.target.value);
                        setUser({...user, username: event.target.value});
                    }}
                    fullWidth={true}
                    label="Username"
                    variant="outlined"
                />
                <br />
                <br />
                <TextField
                    onChange={(event) => {
                        // setEmail(event.target.value);
                        setUser({...user, email: event.target.value});
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(event) => {
                        // setPassword(e.target.value);
                        setUser({...user, password: event.target.value})
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
        <div style={{display: "flex", justifyContent: "center"}}>
              <p>Already have an account. Visit <Link href="/signin">Signin</Link> page here.</p>
        </div>
    </div>
  )
}

export default Signup;