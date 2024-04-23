import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Drawer, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CrossIcon from '../assets/cross.svg';

const AllUsers = () => {
  const [transactions, setTransactions] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [addMoney, setAddMoney] = useState(null);
  const [deductMoney, setDeductMoney] = useState(null);
  const[deviceId,setDeviceId]=useState(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    console.log(storedUsername)

    if (storedUsername !== 'ashu' || storedPassword !== '54321@sHu') {
      window.location.replace('/');
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://20.193.153.95:3000/user/getUser`);
        setTransactions(response.data.data);

        const formattedData = response.data.data.map((transaction) => ({
          id: transaction._id,
          name: transaction.name,
          phone: transaction.phone,
          email: transaction.email,
          wallet: transaction.wallet.toFixed(2),
          withdrawal_amount: Math.abs(transaction.withdrawal_amount).toFixed(2),
          referred_wallet: Math.abs(transaction.referred_wallet).toFixed(2),
          created_at: moment(transaction.createdAt).format('YYYY-MM-DD'),
          device_id: transaction.deviceId,
        }));

        setData(formattedData);

        const tableColumns = [
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'phone', headerName: 'Phone', width: 220 },
          { field: 'email', headerName: 'Email', width: 260 },
          { field: 'wallet', headerName: 'Wallet', width: 250 },
          { field: 'withdrawal_amount', headerName: 'Withdrawal Amount', width: 250 },
          { field: 'created_at', headerName: 'Created At', width: 250 },
          { field: 'device_id', headerName: 'Device Id', width: 250 },
          { field: 'bets', headerName: 'Show Bets', width: 250 },
          {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
              <Button variant="contained" size="small" onClick={() => handleOpenModal(params.row.phone,params.row.device_id)}>
                Action
              </Button>
            ),
          },
        ];

        setColumns(tableColumns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handlePayment = (phone) => {
    navigate(`/history/${phone}`);
  };

  const handleOpenModal = (phone,device_id) => {
    setOpenModal(true);
    setPhone(phone);
    setDeviceId(device_id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setAddMoney('');
    setDeductMoney('');
  };

  const handleAddMoneyChange = (event) => {
    const value = event.target.value;
    setAddMoney(value !== '' ? parseInt(value, 10) : null);
  };

  const handleDeductMoneyChange = (event) => {
    const value = event.target.value;
    setDeductMoney(value !== '' ? parseInt(value, 10) : null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSubmit = async () => {
    try {
      let apiEndpoint;
      let requestData;

      if (addMoney !== null) {
        apiEndpoint = `http://20.193.153.95:3000/wallet/deposit`;
        requestData = {
          phone,
          amount: addMoney,
          deviceId
        };
        
      } else if (deductMoney !== null) {
        apiEndpoint = `http://20.193.153.95:3000/wallet/withdraw`;
        requestData = {
          phone,
          amount: deductMoney,
          deviceId
        };
      } else {
        return;
      }

      const response = await axios.post(apiEndpoint, requestData);
      console.log(response.data);

      handleCloseModal();
      await this.fetchData()
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'lightblue',
    fontSize: '16px',
    margin: '8px 0',
    display: 'block',
    transition: 'color 0.3s',
    backgroundColor:'#081A30',
    
  };

  linkStyle[':hover'] = {
    color: '#007bff',
  };

  return (
    <div>
      <header
        style={{
          backgroundColor: '#102339',
          color: 'lightblue',
          textAlign: 'center',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add shadow
          zIndex: 1, // Ensure header is on top of other elements
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ marginLeft: '6in' }}>
          <h2 style={{ color: 'lightblue' }}>All Users</h2>
        </div>
      </header>

      {/* Drawer component */}

      <Drawer 
  anchor="left"
  open={isDrawerOpen}
  onClose={toggleDrawer(false)}
>
  <div style={{ backgroundColor: '#102339', width: '250px', height: '100%' }}>
    {/* Close button */}
    <div style={{ padding: '10px', textAlign: 'right' }}>
      <img 
        src={CrossIcon} 
        alt="Close Icon" 
        style={{ 
          width: '25px', 
          height: '25px', 
          cursor: 'pointer', 
          backgroundColor: 'white', 
          borderRadius: '50%', 
          padding: '5px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'
        }} 
        onClick={toggleDrawer(false)}
      />
    </div>
    {/* Line */}
    <div style={{ borderTop: '1px solid #FFFFFF', marginBottom: '10px' }}></div>
    {/* List of links in the drawer */}
    <div style={{ padding: '0 20px' }}>
      <Link to="/transaction" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle, marginBottom: '20px' }}>All Transactions</Link>
      <Link to="/pending" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle, marginBottom: '20px' }}>Pending Requests</Link>
      <Link to="/approved" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle, marginBottom: '20px' }}>Approved Transactions</Link>
      <Link to="/users" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle, marginBottom: '20px' }}>All Users</Link>
      <Link to="/weeklyUsers" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle, marginBottom: '20px' }}>Weekly Users</Link>
      <Link to="/daily" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle, marginBottom: '20px' }}>Daily Transactions</Link>
      <Link to="/week" onClick={() => setDrawerOpen(false)} style={{ ...linkStyle, marginBottom: '20px' }}>Weekly Transactions</Link>
    </div>
  </div>
</Drawer>



      {/* DataGrid component */}
      <DataGrid style={{background:'#081A30', color: 'lightblue'}}
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        // autoHeight
        // disableSelectionOnClick
      />

      {/* Dialog component */}
      <Dialog open={openModal} onClose={handleCloseModal} style={{background:'#081A30', color: 'lightblue'}}>
        <DialogTitle>Add/Deduct Money</DialogTitle>
        <DialogContent>
          <TextField
            label="Add Money"
            type="number"
            value={addMoney}
            onChange={handleAddMoneyChange}
          />
          <TextField
            label="Deduct Money"
            type="number"
            value={deductMoney}
            onChange={handleDeductMoneyChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default AllUsers;
