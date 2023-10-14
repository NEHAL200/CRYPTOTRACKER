import React, { useState,useEffect } from 'react';
import {makeStyles} from '@material-ui/core';
import axios from 'axios';
import {TrendingCoins} from "../Config/api";
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const useStyles=makeStyles((theme) => ({
      carosol:{
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            // border:"1px solid #fff",

      },
      carouselItem:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textTransform:'uppercase',
            color: 'white'
      }
}));

export function numberWithCommas(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}


const Carosol = () => {
     const classes=useStyles();

     const [Trending,setTrending]=useState([]);

//   console.log(Trending);
      //useContext hook using to get the currency data
      const {curr,Logo} = CryptoState();

      //fetching the trending coins data from the api using axios
      const fetchData=async() =>{
            const {data}=await axios.get(TrendingCoins(curr));
            setTrending(data);
      }

      //fetching the data whenever there is any changes in the currency
      useEffect(() => {
            fetchData();
      }, [curr]);

   

      //trending coins items
      const items = Trending.map((coin)=>{

               //profit formulation
               let profit = coin.price_change_percentage_24h>=0;
        
            return(
                  <Link
                  className={classes.carouselItem}
                  to={`/coins/${coin.id}`}
                  >
                   <img src={coin.image}
                    alt={coin.name}
                    height="90"
                    style={{marginBottom:10}} />

                    <span>{coin.symbol}
                    &nbsp;
                  <span style={{fontWeight:"bold",color:profit>0?"rgba(14,203,129)":"red",}}>
                        {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}
                  </span>
                  </span> 
                <br/>
                  <span style={{fontSize:22,fontWeight:500, color:"gold"}}>
                      {Logo}  {coin.symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                  </span>
                  
                  </Link>
            )
      });
      
      //responsive code for the carousel
      const responsive = {
            0:{
                  items:2,
            },
            512:{
                  items:4,
            },
      }
      return (
            <div className={classes.carosol}>

            <AliceCarousel 
                  mouseTracking
                  infinite
                  autoPlayInterval={1000}
                  animationDuration={1500}
                  disableDotsControls
                  disableButtonsControls
                  responsive={responsive}
                  autoPlay
                  items={items}
            />
      
            </div>
      )
}

export default Carosol;
