
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
    </Router>
  );
}

export default App;
