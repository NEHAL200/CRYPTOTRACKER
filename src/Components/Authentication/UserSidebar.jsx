import * as React from 'react';
import {Box,Drawer,MailIcon,InboxIcon,
      ListItemText, Button,List,Divider,ListItem,ListItemIcon, Avatar, makeStyles} from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../Firebase_setup';
import {numberWithCommas} from "../Carosol";
import {AiFillDelete} from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

const useStyles= makeStyles({
 container: {
       width:280,
       padding:25,
       height:"100%",
       display: "flex",
       flexDirection: "column",
 },
 profile:{
       flex:1,
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       gap:"20px",
       height: "92%"
 },
 picture:{
       width:100,
       height:100,
       cursor: "pointer",
       backgroundColor:"white",
       objectFit:"contain"

 },
 logout:{
       height:"8%",
       width:"100%",
       backgroundColor:"red",
       marginTop:20
 },
 watchlist:{
       flex:1,
       backgroundColor:"white",
       color:"black",
       width:"100%",
       borderRadius:10,
       padding:15,
       display:"flex",
       flexDirection: "column",
       alignItems: "center",
       gap:10,
       overflow:"scroll"
 },
 coin:{
       padding:10,
       borderRadius:5,
       backgroundColor:"#EEBC1D",
       width:"100%",
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
       fontWeight:"bold",


 }

});


export default function UserSidebar() {
const classes=useStyles();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const {User,setAlert,watchlist,Coin,Logo}= CryptoState();

  //removeing coin data from the storage
//   const removeWatchlist=async(coin)=>{
//       const coinRef= doc(database,"watchlist",User.uid); 

//       try{
//             await setDoc(coinRef,
//               {coins:watchlist.filter((watch)=>watch!==coin?.id)},
//               {merge:"true"}
//               );
    
//               setAlert({
//                     open:true,
//                     message:`${coin?.name} remove from WishList`,
//                     type:"success",
//               })
  
        
  
//       }catch(e){
//         setAlert({
//               open:true,
//               message:e.message,
//               type:"error",
//         })
  
//       }

//   }

  const logout=()=>{
        signOut(auth);
      setAlert({
            open: true,
            type: 'success',
            message:"Logout Successfully!"
      })

      toggleDrawer();

  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
        <Avatar
              onClick={toggleDrawer(anchor,true)}
              style={{
                    height:35,
                    width:35,
                  //   marginLeft:13,
                    cursor: "pointer",
                    backgroundColor:"white"
              }}
              src={User.photoURL}
              alt={User.displayName || User.email}
        />


          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
             <div className={classes.container}>
             <div className={classes.profile}>
             <Avatar
              className={classes.picture}
              src={User.photoURL}
              alt={User.displayName || User.email}
        />

        <span style={{
              width: '100%',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bolder',
              wordWrap: 'break-word'

        }}>
              {User.displayName||User.email}
        </span>

        <div className={classes.watchlist}>

        <span style={{
              fontSize:15,fontWeight:"bold"
        }}>
              Watchlist
        </span>

        {/* //the watchlist part */}
       
       {
            Coin.map((coin)=>{
                  if(watchlist.includes(coin.id))
                  return(
                        <div className={classes.coin}>
                              <span>{coin.name}</span>
                              <span
                              style={{
                                    display: 'flex',
                                    gap:8
                              }}
                              >{Logo}
                             { numberWithCommas(coin.current_price.toFixed(2))}
{/* 
                             <AiFillDelete
                                style={{ fontSize:13,
                                cursor: "pointer"}}
                              //   onClick={removeWatchlist(coin)}
                             /> */}

                            
                              </span>
                        </div>
                  )
            })
       }


        </div>

             </div>
         
         <Button
         varient="contained"
         className={classes.logout}
         onClick={logout}
         >
               Log Out
         </Button>


          </div>

  
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
