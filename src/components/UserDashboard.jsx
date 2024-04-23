import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';

const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'username', headerName: 'username ', type: 'number', width: 250, sortable: true },

    { field: 'firstName', headerName: 'First Name', width: 300, sortable: true, valueGetter: (params) => params.row.firstname },
    { field: 'lastName', headerName: 'Last Name', width: 290, sortable: true, valueGetter: (params) => params.row.lastname },
    { field: 'email', headerName: 'Email', width: 200, sortable: true, valueGetter: (params) => params.row.email },
    { field: 'phone', headerName: 'Phone', type: 'number', width: 250, sortable: true, valueGetter: (params) => params.row.phone },
    { field: 'password', headerName: 'Password', width: 250, sortable: true, valueGetter: (params) => params.row.password },


  ];
  
export default function DairyDataTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogLabel, setDialogLabel] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://20.193.153.95:3000/user`);
      console.log(response)
      const rowsWithIds = response.data.map((row, index) => ({ ...row, id: index + 1 }));
      setData(rowsWithIds);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    fetchData();

    if (storedUsername !== 'ashu' || storedPassword !== '54321@sHu') {
      window.location.replace('/');
    }
  }, []);

  const openDialog = (label) => {
    setDialogLabel(label);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setInputValue(''); // Reset input value when dialog is closed
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDialogSubmit = () => {
    // Handle submit logic here
    console.log('Submitted value:', inputValue);
    closeDialog();
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfcfc' }}>
      <Header />
      <br />
      <div style={{ fontWeight: 'bold', fontSize: 'xx-large', fontFamily: 'monospace', textAlign: 'center' }}>Users Dashboard</div>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Button style={{ marginRight: '10px', marginLeft: '10px', backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161' }} onClick={() => openDialog('Add User Number')}>
          Add User
        </Button>
        <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161' }} onClick={() => openDialog('Remove User Number')}>Remove User</Button>
      </div>
      <div style={{ flex: 1, marginBottom: '10px', display: 'flex', justifyContent: 'center', background: '#d8dfeb' }}>
        {data && data.length>0 ? (
        <DataGrid
          rows={data}
          columns={columns}
          className="custom-data-grid"
          checkboxSelection
          autoHeight
          style={{ background: ' #cce0e0', boxShadow: '0px 8px 16px rgba(159, 181, 181, 0.9)', paddingRight: '10px', width: '80%', fontFamily: 'monospace' }} // Adjust table height automatically
        />):(<div>Loading...</div>)}
      </div>
      <br />
      <Footer />
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', width: '400px', textAlign: 'center' }}>{dialogLabel}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Number"
            type="text"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }} onClick={closeDialog}>Cancel</Button>
          <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }} onClick={handleDialogSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
