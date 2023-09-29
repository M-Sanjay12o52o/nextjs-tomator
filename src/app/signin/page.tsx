'use client'

import { Typography, Card, TextField, Button } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React from "react"

function Signin() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/signin", user);
        console.log("Login success", response.data);
        router.push("/");
    } catch (error:any) {
        console.log("Login failed", error.message);
    } finally{
    setLoading(false);
    }
}

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

  return <div>
  <div style={{
      paddingTop: 150,
      marginBottom: 10,
      display: "flex",
      justifyContent: "center"
  }}>
      <Typography variant={"h6"}>
      Welcome to Coursera. Sign in below
      </Typography>
  </div>
<div style={{display: "flex", justifyContent: "center"}}>
  <Card variant={"outlined"} style={{width: 400, padding: 20}}>
      <TextField
          onChange={(event) => {
              setUser({...user, email: event.target.value});
          }}
          fullWidth={true}
          label="Email"
          variant="outlined"
      />
      <br/><br/>
      <TextField
          onChange={(e) => {
            //   setPassword(e.target.value);
            setUser({...user, password: e.target.value});
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
          onClick={handleSignIn}
      > Signin</Button>
  </Card>
</div>
    <div style={{display: "flex", justifyContent: "center"}}>
        <p>Don't have an account. Visit <Link href="/signup">Signup</Link> page here.</p>
    </div>
</div>
}

export default Signin;