import { BrowserRouter,Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { makeStyles } from '@material-ui/styles';
import Alert from "./Components/Alert";


function App() {
  const useStyles = makeStyles(()=>({
    app:{
    backgroundColor:"#14161a",
    color:"#fff",
    minHeight:"100vh"
    
    }
  }));
 
  const classes=useStyles();
  return (
    <BrowserRouter>
    <div className={classes.app}>
    
    {/* //the header part of iur web_application */}
    <Header/>
  
    {/* //home page router */}
    <Route exact path="/" component={Homepage}></Route>

   {/* //another route for a page that show details of each coin */}
   <Route path="/coins/:id" component={Coinpage}></Route>

    </div>
    <Alert/>
    </BrowserRouter>
  );
}

export default App;
