import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';
import { useState } from 'react';

const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'title', headerName: 'Product Name', width: 400, sortable: true, valueGetter: (params) => params.row.title.shortTitle },
    { field: 'title', headerName: 'Product Full Name', width: 300, sortable: true, valueGetter: (params) => params.row.title.longTitle },
    { field: 'price.mrp', headerName: 'Actual Price', type: 'number', width: 290, sortable: true, valueGetter: (params) => params.row.price.mrp },
    { field: 'price.cost', headerName: 'MRP', type: 'number', width: 250, sortable: true, valueGetter: (params) => params.row.price.cost },
    { field: 'price.discount', headerName: 'Discount', type: 'number', width: 250, sortable: true, valueGetter: (params) => params.row.price.discount },
    { field: 'quantity', headerName: 'Quantity ', type: 'number', width: 250, sortable: true },
    { field: 'description', headerName: 'Description', width: 250, sortable: false },
    { field: 'discount', headerName: 'DiscountLine', width: 250, sortable: false },
    { field: 'tagline', headerName: 'Tagline', width: 250, sortable: false },
  ];
  
export default function ProductDashboard() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogLabel, setDialogLabel] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = React.useState([]);
  const [productData, setProductData] = useState({
    url: '',
    detailUrl: '',
    shortTitle: '',
    longTitle: '',
    mrp: 0,
    cost: 0,
    discount: 0,
    quantity: 0,
    description: '',
    discounts: '',
    tagline: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://20.193.153.95:3000/products`);
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

    if (storedUsername !== 'flAdmin' || storedPassword !== 'flip1234') {
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
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleDialogSubmit = (productData) => {
    // Send data to POST API
    axios.post('http://localhost:8000/addProducts', productData)
      .then(response => {
        console.log('Post successful', response);
        closeDialog();
      })
      .catch(error => {
        console.error('Error posting data', error);
      });
  };


  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfcfc' }}>
      <Header />
      <br />
      <div style={{ fontWeight: 'bold', fontSize: 'xx-large', fontFamily: 'monospace', textAlign: 'center' }}>Products Dashboard</div>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Button style={{ marginRight: '10px', marginLeft: '10px', backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161' }} onClick={() => openDialog('Add Product Number')}>
          Add Products
        </Button>
        <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161' }} onClick={() => openDialog('Remove Product Number')}>Remove Product</Button>
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
        <DialogTitle style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', width: '400px', textAlign: 'center' }}>Enter Product Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Product Image URL"
            type="text"
            fullWidth
            name="url"
            value={productData.url}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="detailUrl"
            label="Product Main Image Detail URL"
            type="text"
            fullWidth
            name="detailUrl"
            value={productData.detailUrl}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="shortTitle"
            label="Short Title of Product"
            type="text"
            fullWidth
            name="shortTitle"
            value={productData.shortTitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="longTitle"
            label="Long Title of Product"
            type="text"
            fullWidth
            name="longTitle"
            value={productData.longTitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="mrp"
            label="Show Price"
            type="number"
            fullWidth
            name="mrp"
            value={productData.mrp}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="cost"
            label="Selling Price"
            type="number"
            fullWidth
            name="cost"
            value={productData.cost}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="discount"
            label="Discount"
            type="number"
            fullWidth
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="discounts"
            label="Discount Line"
            type="text"
            fullWidth
            name="discounts"
            value={productData.discounts}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="tagline"
            label="Tagline"
            type="text"
            fullWidth
            name="tagline"
            value={productData.tagline}
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
