import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { CryptoState } from '../CryptoContext';

const Alert = () => {
      const {Alert,setAlert}= CryptoState();

 const handleClose=(event,reason)=>{
       if(reason==="clickway"){
             return ;
       }

       setAlert({
             open:false,
       })
 }


return(
 <Snackbar
 open={Alert.open}
 autoHideDuration={3000}
 onClose={handleClose}
 >
     <MuiAlert
     onClose={handleClose}
     elevation={10}
     variant="filled"
     severity={Alert.type}
     >
           {Alert.message}
     </MuiAlert>

 </Snackbar>
)
};

export default Alert;
