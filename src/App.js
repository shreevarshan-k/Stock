
import './App.css';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Login from './Login';
import Homepage from './Homepage';
import AddParty from './AddParty';
import PartiesList from './PartiesList';
import Purchase from './Purchase';
import PurchaseList from './PurchaseList';
import AddStock from './AddStock';
import StockList from './StockList';
import PartyPurchase from './PartyPurchase';
import ReturnForm from './ReturnForm';
import ReturnBill from './ReturnBill';
import MultipleInput from './MultipleInput';
import ReturnInvoice from './ReturnInvoice';

function App() {
  return (
    <Router>
    <Route path="/Login"  component={Login}/>
    <Route path="/" exact component={Homepage} />
    
    <Route path="/AddParty" component={AddParty} />
    <Route path="/PartiesList" component={PartiesList}/>
    <Route path="/Purchase" component={Purchase}/>
    <Route path="/PurchaseList" component={PurchaseList}/>
    <Route path="/AddStock" component={AddStock}/>
    <Route path="/StockList" component={StockList}/>
    <Route path="/PartyPurchase" component={PartyPurchase}/>
    <Route path="/ReturnForm" component={ReturnForm}/>
    <Route path="/MultipleInput" component={MultipleInput}/>
    <Route path="/ReturnBill" component={ReturnBill}/>
    <Route path="/ReturnInvoice" component={ReturnInvoice}/>
   
    </Router>
  );
}

export default App;
