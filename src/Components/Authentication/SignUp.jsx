import { Box, Button, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase_setup';

const SignUp =({handleClose}) => {
      const [Email, setEmail] = useState("");
      const [Password, setPassword] = useState("");
      const [ConfirmPassword, setConfirmPassword] = useState(""); 
         const {setAlert}= CryptoState();
      const Submit=async ()=>{
            if(Password!==ConfirmPassword){
              setAlert({
                    open: true,
                    message:"password are not matched",
                    type:"error"
              });

              return;
            }

            try{
             const result = await createUserWithEmailAndPassword(
                   auth,
                   Email,
                   Password,
             )


             setAlert({
                  open: true,
                  message:`Sign Up Successfully. ${result.user.email}`,
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
  return(
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

{/* //for confirm password */}
<TextField
                 variant="outlined"
                 type="password"
                 label="Enter Confirm password"
                 value={ConfirmPassword}
                 onChange={(e)=>setConfirmPassword(e.target.value)}
                 fullWidth
           />
  
  <Button
  varient="contained"
  size="large"
  style={{backgroundColor:"red"}}
  onClick={Submit}
  >
        Sign Up
  </Button>
       </Box>
  );
};

export default SignUp;
