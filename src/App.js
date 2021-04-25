
import './App.css';
// eslint-disable-next-line
import { Route, BrowserRouter as BrowserRouter} from "react-router-dom";
//import Login from './Login';
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
import SalesBill from './SalesBill';

import SalesBillTemplate from './SalesBillTemplate';
import SalesReport from './SalesReport'
import NewLogin from './NewLogin'
import ExpensenseEntry from './ExpensenseEntry';
import ExpensenseReport from './ExpensenseReport';
import AddressTemplate from './AddressTemplate';
import invoice from './invoice';
import SaleInvoiceTemplate from './SaleInvoiceTemplate';

function App() {
  return (
    <BrowserRouter >
    <Route path="/"  exact component={NewLogin}/>
    <Route path="/Homepage" component={Homepage} />
    
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
   <Route path="/SalesBill" component={SalesBill}/>
   <Route path="/SalesBillTemplate" component={SalesBillTemplate}/>
   <Route path="/SalesReport" component={SalesReport}/>
   {/* <Route path="/NewLogin" component={NewLogin}/> */}
   <Route path="/ExpensenseEntry" component={ExpensenseEntry}/>
   <Route path="/ExpensenseReport" component={ExpensenseReport}/>
   <Route path="/AddressTemplate" component={AddressTemplate}/>
   <Route path="/Invoice" component={invoice}/>
   <Route path="/SalesInvoiceTemplate" component={SaleInvoiceTemplate}/>
    </BrowserRouter>
  );
}

export default App;
 