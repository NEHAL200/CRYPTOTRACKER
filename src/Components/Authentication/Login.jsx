import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase_setup';
const Login = ({handleClose}) => {
      const [Email, setEmail] = useState("");
      const [Password, setPassword] = useState("");
   const {setAlert} = CryptoState();

      const Submit=async()=>{
            if(!Email && !Password) {
                  setAlert({
                        open: true,
                        message:"Please fill all the Fields",
                        type:"error"
                  });
                  return;
                }
                try{
                  const result = await signInWithEmailAndPassword(auth,Email,Password);
                   setAlert({
                             open: true,
                             message:`Login Successfully`,
                             type:"success"
                       });
                       handleClose();
            
                 }catch(e){
                       setAlert({
                             open: true,
                             message:e.message,
                             type:"error"
                       });
                     return;
                 }
      }
  return (
      <Box p={3} style={{
            display: "flex",
            flexDirection: "column",
            gap:"20px"
      }}>
      {/* //for email */}
          <TextField
                variant="outlined"
                type="email"
                label="Enter your email address"
                value={Email}
                onChange={(e)=>setEmail(e.target.value)}
                fullWidth
          />
{/* //for password */}
          <TextField
              style={{color:"primary"}}
                variant="outlined"
                type="password"
                label="Enter password"
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
                fullWidth
          />

 
 <Button
 varient="contained"
 size="large"
 style={{backgroundColor:"red"}}
 onClick={Submit}
 >
      Log In
 </Button>
 </Box>
  );
};

export default Login;
