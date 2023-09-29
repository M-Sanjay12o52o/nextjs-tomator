'use client'

import { Typography, Card, TextField, Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"

function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = async () => {
    try {
      const response = await axios.post("/api/signin", {
        email,
        password
      });

      // Assuming the response contains a token upon successful authentication
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem("token", token);

      // Redirect the user to localhost:3000
      window.location.href = "http://localhost:3000";
    } catch (error) {
      // Handle authentication errors
      console.error("Sign-in failed:", error);
    }
  };

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
          onChange={(evant11) => {
              let elemt = evant11.target;
              setEmail(elemt.value);
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
          onClick={handleSignIn}
      > Signin</Button>
  </Card>
</div>
</div>
}

export default Signin;