import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CoinList } from './Config/api';
import { auth, database } from './Firebase_setup';

//create context
const Crypto = createContext();

const CryptoContext = ({children}) => {

const [User, setUser] = useState(null);

useEffect(() => {
onAuthStateChanged(auth,user=>{
      if(user) setUser(user);
      else setUser(null);
})
}, []);


const [Alert, setAlert] = useState({
      open:false,
      message:"",
      type:"success",
});


//to set the watched coin and store it in firebase storage
const [watchlist, setwatchlist] = useState([]);

useEffect(() => {
      if(User){
       const coinRef= doc(database,"watchlist",User.uid); 
      var unsub= onSnapshot(coinRef,(coin)=>{
             if(coin.exists()){
                   setwatchlist(coin.data().coins);
             }else{
                   console.log("no Items in watchlist");
             }
       });
       return ()=>{
            unsub();
      };

      }

    
}, [User]);


      const [curr, setcurr] = useState("INR");
      const [Logo,setLogo]=useState("₹");

      //work when there will be any changes in currency
      useEffect(() => {
            if(curr === "INR") setLogo("₹");
            else if(curr === "USD") setLogo("$");
      },[curr]);

        //for state of coin data from api
        const [Coin, setCoin] = useState([]);
        //if the page is not properly loaded
        const [loading, setloading] = useState(false);

           //fetching the data form the api
      const fetchData = async()=>{
            setloading(true);
            const {data}= await axios.get(CoinList(curr));
            setCoin(data);
            setloading(false);
            
            console.log(Coin);
      }
    


      return <Crypto.Provider value={{
            curr,Logo,
            setcurr,Coin,
            loading,fetchData,
            Alert,setAlert,
            User,watchlist}}>{children}</Crypto.Provider>
}

export default CryptoContext;

//to export the state whole over the App use hooks useContext
export const CryptoState=()=>{
      return useContext(Crypto);
}
