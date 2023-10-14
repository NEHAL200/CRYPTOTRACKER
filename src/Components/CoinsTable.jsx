import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {Pagination} from "@material-ui/lab";
import { CoinList } from '../Config/api';
import {CryptoState} from "../CryptoContext";
import {TableCell,TableRow,TableHead,Table, Container,TableContainer, Typography,TextField ,ThemeProvider,createTheme, LinearProgress, TableBody, TablePagination} from '@material-ui/core';
import { Classnames } from 'react-alice-carousel';
import { useHistory } from 'react-router-dom';
import {numberWithCommas} from "./Carosol";


const dark=createTheme({
      palette: {
            primary:{
                  main:"#fff",
            },
            type:"dark",
      },
});

const CoinsTable = () => {
      
const useStyles = makeStyles({
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
    });
  


const classes=useStyles();
      // //for state of coin data from api
      // const [Coin, setCoin] = useState([]);
      // //if the page is not properly loaded
      // const [loading, setloading] = useState(false);
      //for searching spacific coin
      const [Search, setSearch] = useState("");
      //for pagination
      const [Page, setPage] = useState(1);
      const history=useHistory();

      const {curr,Logo,Coin,loading,fetchData}= CryptoState();

      //fetching the data form the api
      // const fetchData = async()=>{
      //       setloading(true);
      //       const {data}= await axios.get(CoinList(curr));
      //       setCoin(data);
      //       setloading(false);
            
      //       console.log(Coin);
      // }

      useEffect(() => {
      fetchData();
      }, [curr]);
      

    //to handle searching property
const SearchProcess=()=>{
      return Coin.filter((Coin)=>
            Coin.name.toLowerCase().includes(Search)||
            Coin.symbol.toLowerCase().includes(Search)
      );
}  


  return (<>

<ThemeProvider theme={dark}>

  <Container style={{textAlign: 'center'
}}>

  <Typography
   variant="h4"
   style={{margin:18,color:"gold"}}
   >
      All Cryptocurrencies Market Values
  </Typography>


  <TextField
  label="Search For Cryptocurrency....."
  varient="outlined"
  style={{marginBottom:30,width:"80%"}}
  onChange={(e)=>{setSearch(e.target.value)}}
  />
<TableContainer>
{
      loading?(
            <LinearProgress style={{backgroundColor:"gold"}}/>

      ):(
            <>
            <Table style={{marginBottom:30}}>
                  <TableHead style={{backgroundColor:"grey",}}>
                  <TableRow>
                        {["Coin","price","24 Change","Market Cap"].map((head)=>(
                              <TableCell
                              style={{color:"white",
                              fontWeight:"600",
                              fontSize:"1.5rem"}}
                              key={head}
                              align={head==="Coin"?"":"right"}>
                              {head}
                              </TableCell>
                        ))
                        }
                  </TableRow>
                  </TableHead>

                  <TableBody>

                  {SearchProcess()
                  .slice((Page-1) * 10,(Page-1)*10 +10)
                  .map((row)=>{
                        const profit=row.price_change_percentage_24h>0;
                        return (
                              <TableRow
                                    className={Classnames.row}
                                    key={row.name}
                                    onClick={()=>history.push(`/coins/${row.id}`)}>
                                    <TableCell component='th' scope='row' style={{
                                          display: 'flex',
                                          gap:13
                                    }}>

                          <div style={{textTransform:"uppercase",fontSize:10,
                                   textAlign: "center",display:"flex", flexDirection:"column"}}>
                                    <img src={row.image} alt={row.name} 
                                    height="50" 
                                    style={{marginBottom:8,cursor:"pointer"}} />


                                    <span style={{fontSize:15}}>
                                          {row.symbol}
                                    </span>

                                    <span style={{color:"darkgrey",}}>
                                          {row.name}
                                    </span>

                                    </div>

                                    </TableCell>
                               
                               <TableCell
                               align="right"
                               style={{fontSize:15}}
                               > 

                               {Logo}{" "}{numberWithCommas(row.current_price.toFixed(2))}

                               </TableCell>
                                    
                                    <TableCell
                                    align="right"
                                     style={{fontSize:15,
                                     color:profit>0?"rgba(14,203,129)":"red",
                                     fontWeight: "bold"
                                     }}>
                                          {profit && "+"}
                                          {row.price_change_percentage_24h.toFixed(2)}%
                                    </TableCell>

                                    <TableCell
                                    align="right"
                                     style={{fontSize:15,
                                     fontWeight: "bold"
                                     }}>
                                        {Logo}{" "}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                    </TableCell>
                              </TableRow>
                        )
                  })}
                  </TableBody>
            </Table>
            </>
      )
}
</TableContainer>
 
 <Pagination
 count={(SearchProcess()?.length/10).toFixed(0)}
 classes={{ul:classes.pagination}}
 style={{
       width: '100%',
       display: 'flex',
       justifyContent: 'center',
       padding:25,
 }}
       onChange={(_,value)=>{
             setPage(value);
             window.scroll(0,460);
       }}
 />
   
  </Container>
</ThemeProvider>
       
  </>)
};

export default CoinsTable;
