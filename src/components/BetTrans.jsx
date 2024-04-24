import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Drawer,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { isEmpty } from 'lodash';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import CrossIcon from '../assets/cross.svg';
const BetTrans = (props) => {
  const phone=useParams()
  const [transactions, setTransactions] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [winAmount, setWinningAmount] = useState(0);
  const [looseAmount, setlosingAmount] = useState(0);
  const [data,setData]=useState([]);
  const [columns,setColumn]=useState([]);
  console.log(`>>>>>>>>>>>>>${JSON.stringify(phone.phone)}`)
  const fetchData = async () => {
    try {
      console.log(`>>>>>>>>json>>>>>>`);
      const response = await axios.get(`http://20.193.153.95:3000/lucky/getLuckyTrans?phone=${phone.phone}`)
      console.log(response);
      setTransactions(response.data);
    const sum = response.data.transactions.reduce((acc, transaction) => {
        if (transaction.amount>0) {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);

    setWinningAmount(sum);
    const sums = response.data.transactions.reduce((acc, transaction) => {
        if (transaction.amount <0) {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);
      const x=response.data.transactions.reverse()
      
      const data = x.map((transaction) => ({
        key: transaction._id,
        amount: Math.abs(transaction.amount.toFixed(2)),
        color: transaction.color===0?'Red':transaction.color===1?'Yellow':'Blue',
        status:transaction.amount>0?'Winning Amount':'Bet Placed',
        time: new Date(transaction.createdAt).toISOString().split('T')[0],
        times: new Date(transaction.createdAt).toISOString().split('T')[1]


      }));
      setData(data)
      console.log(data)
      const columns=[
        {
            "field":"status",
            "headerName":"Status",
            width:300,
            cellClassName:'property'
          },
        {
          "field":"amount",
          "headerName":"Amount",
          width:300,
          cellClassName:'property'
        },
        {
          "field":"color",
          "headerName":"Color",
          width:300,
          cellClassName:'property'
        },

        {
            "field":"time",
            "headerName":"CreatedAtDate",
            width:300,
            cellClassName:'property'
          },
          {
            "field":"times",
            "headerName":"CreatedAtTime",
            width:300,
            cellClassName:'property'
          }
    ]
    setColumn(columns)
    setlosingAmount(sums);
      console.log(`>>>>>>>>>td>>>${JSON.stringify(data)}`);
      console.log(`>>>>>>>>>ts>>>${JSON.stringify(transactions)}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();

    // Cleanup function to cancel the request or perform other cleanup
    


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
    transition: 'color 0.3s'
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
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          background: '#102339',
          color: '#fff',
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
          <h2 style={{ color: '#fff' }}>Bet Played by user</h2>
        </div>
      </header>

      {/* Sidebar Drawer */}
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

      <div style={{ background: '#102339', padding: '20px', color: 'lightblue' }}>
        <h2 style={{ marginBottom: '10px' }}>Total Winning Amount: {winAmount.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Loosing Amount: {Math.abs(looseAmount.toFixed(2))}</h2>
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
        getRowId={(row) => row.key}
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 10,
          bottom: params.isLastVisible ? 0 : 10,
        })}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          '&.MuiDataGrid-root': {
            bgcolor: '#081A30',
            color: '#fff',
            borderColor: 'transparent',
          },
          '&.MuiDataGrid-filterIcon': {
            bgcolor: '#081A30',
            color: '#fff',
            borderColor: 'transparent',
          },
          '& .MuiDataGrid-cell, & .MuiDataGrid-colCellTitle': {
            background:'#081A30'
          },
        }}
      />

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#081A30',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <p>&copy; 2024 baazi Maar</p>
      </footer>
    </div>
  );
};

export default BetTrans;

