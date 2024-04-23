import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Drawer,IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const HistoryTrans = (props) => {
  const phone=useParams()
  const [transactions, setTransactions] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [winAmount, setWinningAmount] = useState(0);
  const [looseAmount, setlosingAmount] = useState(0);
  const[columns,setColumns]=useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const handleColumnHeaderClick = (column) => {
    setActiveColumn(column.field === activeColumn ? null : column.field);
  };
  const [data,setData]=useState([]);
  const fetchData = async () => {
    try {
      
      console.log(`>>>>>>>>json>>>>>>`);
      const response = await axios.get(`http://20.193.153.95:3000/wallet/getTransiction?phone=${phone.phone}`);
      setTransactions(response.data.wallet);
      console.log(`>>>>>>>><<<${JSON.stringify(response.data.wallet)}`)
      const sum = response.data.wallet.walletTrans.reduce((acc, transaction) => {
        if (transaction.amount>0) {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);

    setWinningAmount(sum);
    const sums = response.data.wallet.walletTrans.reduce((acc, transaction) => {
        if (transaction.amount <0) {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);
      const x=response.data.wallet.walletTrans.reverse();
      const data = x.map((transaction) => ({
        key: transaction._id,
        amount: transaction.amount,
        date:moment(transaction.time).format('YYYY-MM-DD'),
        time: moment(transaction.time).format('HH:mm:ss'),
        type: transaction.amount > 0 ? 'Deposit' : 'Withdraw',
      }));
      const columns=[
        {
          "field":"amount",
          "headerName":"Amount",
          width:500,
          cellClassName:'property'
        },
        {
          "field":"date",
          "headerName":"Date",
          width:500,
          cellClassName:'property'
        },
        {
          "field":"time",
          "headerName":"Time",
          width:500,
          cellClassName:'property'
        },
        {
          "field":"type",
          "headerName":"Type",
          width:500,
          cellClassName:'property'
        }
    ]
      setColumns(columns)
      setData(data)
      setlosingAmount(sums);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername !== 'ashu' || storedPassword !== '54321@sHu') {
      window.location.replace('/');
    }
    fetchData();
  
    // Cleanup function to cancel the request or perform other cleanup
    return () => {
      // Add cleanup logic here if needed
    };
  }, []);  // Empty dependency array, runs only once on mount
  
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const [sortModel, setSortModel] = useState([]);

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  const renderSortIndicator = (field) => {
    const sortedColumn = sortModel.find((column) => column.field === field);
    if (sortedColumn) {
      return sortedColumn.sort === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  const CustomHeaderCell = ({ column }) => (
    <div style={{fontSize:'20px',fontWeight:'bold'}}>
      {column.headerName}
      {renderSortIndicator(column.field)}
    </div>
  );
  const linkStyle = {
    textDecoration: 'none',
    fontSize: '16px',
    margin: '8px 0',
    display: 'block',
    transition: 'color 0.3s',
    color:'black',
    background:'#DADADA'
  };
  
  linkStyle[':hover'] = {
    color: '#007bff',
  };
  console.log(`>>>>>>>>>ts>>>${JSON.stringify(transactions)}`)
  return (
    
    <div>
    {/* Header with Sidebar Button */}
    <header
      style={{
        textAlign: 'center',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        background: '#F1F1F1',
        color: 'black'
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
        <h2 style={{ color: 'black' }}>History of Users Transactions</h2>
      </div>
    </header>

    {/* Sidebar Drawer */}
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <div style={{ width: '250px', padding: '20px', background: '#DADADA' }}>
        {/* List of links in the drawer */}
        <Link to="/" onClick={() => setDrawerOpen(false)} style={linkStyle}>All Transactions</Link>
        <Link to="/pending" onClick={() => setDrawerOpen(false)} style={linkStyle}>Pending Withdrawal Requests</Link>
        <Link to="/approved" onClick={() => setDrawerOpen(false)} style={linkStyle}>Approved Transactions</Link>
        <Link to="/users" onClick={() => setDrawerOpen(false)} style={linkStyle}>All Users</Link>
        <Link to="/lastUsers" onClick={() => setDrawerOpen(false)} style={linkStyle}>Last 7 days Users</Link>
      </div>
    </Drawer>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px',background:'#F1F1F1' }}>
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
    <Card sx={{ maxWidth: 275, background: 'white', color: 'black' }}>
    <CardContent>
          <Typography variant="h5" component="div">
            Total Deposit Amount
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {winAmount}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 300, background: 'white', color: 'black' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total Withdraw Amount
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {looseAmount}
          </Typography>
        </CardContent>
      </Card>
    </div>
    </div>

    {/* Main Content */}
    <DataGrid
      rows={data}
      columns={columns.map((column) => ({
        ...column,
        headerName: (
          <CustomHeaderCell column={column} />
        ),
      }))}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      components={{
        ColumnHeaderCell: ({ column }) => (
          <div onClick={() => handleColumnHeaderClick(column)}>
            {column.headerName}
            {renderSortIndicator(column.field)}
          </div>
        ),
      }}

      getRowId={(row) => row.key}
      pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
      getRowSpacing={(params) => ({
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      })}
      componentsProps={{
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
         },
      }}

      sx={{
        '&.MuiDataGrid-root': {
          bgcolor: '#DADADA',
          color: '#black', // Blue color
          borderColor: 'transparent',
        },
        '&.MuiDataGrid-filterIcon': {
          bgcolor: '#1C2025',
          color: 'white', // Blue color
          borderColor: 'transparent',
        },
      }}
    />
      {activeColumn && (
        <div style={{ background: '#F1F1F1', color: 'black', padding: '10px' }}>
          <TextField label={`Search ${activeColumn}`} variant="outlined" fullWidth />
        </div>
      )}


    <footer style={{ textAlign: 'center', padding: '10px', color: '#99E9FA',background:'#DADADA' }}>
      <p>&copy; 2024 baazi Maar</p>
    </footer>
  </div>
  );
};

export default HistoryTrans;

