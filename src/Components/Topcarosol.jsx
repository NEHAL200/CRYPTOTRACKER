import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container,Typography } from '@material-ui/core';
import Carosol from "./Carosol";


const Topcarosol = () => {

      const useStyles = makeStyles(()=>({
            banner:{
                  backgroundImage:"url(./b4.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%"
                  
            },
           container:{
                 height:400,
                 display:"flex",
                 flexDirection:"column",
                 paddingTop:25,
            //      linerGradient:"black black",
                 justifyContent:"space-around",
            //      border:"1px solid #fff"
           },
           heading: {
                 display:"flex",
                 height:"40%",
                 flexDirection:"column",
                 justifyContent:"center",
            //      textAlign:"center",
           }

      }))
      
      const classes=useStyles();

      return (
            <div className={classes.banner}
           >
            <Container className={classes.container}>
             <div className={classes.heading}>

            <Typography variant="h4"
            style={{ 
                  fontWeight: 'bold',
                  color:"#f5f5f5",
                  marginBottom:10,
                  marginTop:"-5rem",
                  textAlign: 'center'
                  // marginLeft:"-750px"
            }}
            >
           
            Welcome to  Crypto Tracker! Take one step forward into the world of Blockchain and Cryptocurrency.


            </Typography>
    
            <Typography variant="h5"
            style={{ 
                  fontWeight: 'bold',
                  marginBottom:10,
                  color:"white",
                  textAlign: 'center'
                  // marginLeft:"-750px"
            }}
            >
            Explore The World of Cryptocurrency
            </Typography>

             </div>

             <Carosol/>
             
            </Container>                 
            </div>
      )
}

export default Topcarosol;
