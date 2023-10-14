import React from 'react';
import {AppBar, Container,Toolbar, Typography,MenuItem,Select
,createTheme,ThemeProvider} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {useHistory} from "react-router-dom";
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';



const useStyles = makeStyles((theme)=>({
      title:{
            flex:1,
            fontWeight:"bold",
            fontSize:"1.8rem",
            color:"gold",
            fontFamily:"Montserrat",
            cursor:"pointer",
      }
}))
const Header = () => {
const history=useHistory();

const classes=useStyles();

const {curr,setcurr,User}=CryptoState();

const dark=createTheme({
      palette: {
            primary:{
                  main:"#fff",
            },
            type:"dark",
      },
});

      return (
            <ThemeProvider theme={dark}>
            <AppBar color="transparent" position="static">
                  <Container>
                        <Toolbar>
                          
                          {/* //onclicking this it will redirect you to homepage */}
                           <Typography onClick={()=>history.push("/")}
                            className={classes.title}
                        //     className="mainTitle"
                            varient="h6">
                                 Crypto Tracker
                           </Typography>

                           <Select variant="outlined" 
                           style={{
                                 width:100,
                                 height:40,
                                 marginRight:15,
                           }}
                           className="currency_choose"
                           value={curr}
                           onChange={(e)=>setcurr(e.target.value)}>
                           <MenuItem value={"USD"}>USD</MenuItem>
                           <MenuItem value={"INR"}>INR</MenuItem>
                           </Select>
                     {User?<UserSidebar/>:<AuthModal/>}

                        </Toolbar>
                  </Container>
            </AppBar>

            </ThemeProvider>
      )
}

export default Header;
