
import './App.css';
import Home from './components/HomeDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DairyDataTable from './components/UserDashboard';
import ProductDashboard from './components/ProductDashboard';
import MainSpinDashboard from './components/MainDashboard';
import AllUsers from './components/AllUsers';
import TransactionTable from './components/TransactionTable';
import ApprovedTransaction from './components/ApprovedTransation';
import WeeklyTransactionTable from './components/WeeklyTransaction';
import DailyTransactionTable from './components/DailyTransaction';
import PendingTransaction from './components/PendingTransaction';
import LastUsers from './components/WeeklyUsers';
import BetTrans from './components/BetTrans';
function App() {
  return (
        <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/approved" element={<ApprovedTransaction />} />
        <Route path="/transaction" element={<TransactionTable />} />
        <Route path="/week" element={<WeeklyTransactionTable />} />
        <Route path="/pending" element={<PendingTransaction />} />
        <Route path="/daily" element={<DailyTransactionTable />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/weeklyUsers" element={<LastUsers/>} />
        <Route path="/products" element={<ProductDashboard/>}/>
        <Route path="/main" element={<MainSpinDashboard/>}/>
        <Route path="/bet/:phone" element={<BetTrans/>}/>
      </Routes>
    </Router>
  );
}

export default App;
