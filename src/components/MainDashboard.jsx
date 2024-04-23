import React, { useEffect, useState } from 'react';
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import io from 'socket.io-client';

const CardContainer = ({ eventData, secondEvent }) => {
  const [timing, setTiming] = useState(0);
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState('Waiting for result');
  const [lastBets, setLastBets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedColors, setSelectedColors] = useState({ red: false, yellow: false, blue: false });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername !== 'ashu' || storedPassword !== '54321@sHu') {
      window.location.replace('/');
    }
    if (secondEvent !== null) {
      setTiming(secondEvent.time);
      setNumber(secondEvent.number);
      setResult(secondEvent.result);
      setLastBets([
        secondEvent.l, secondEvent.k, secondEvent.j, secondEvent.i,
        secondEvent.h, secondEvent.g, secondEvent.f, secondEvent.e,
        secondEvent.d, secondEvent.c, secondEvent.b, secondEvent.a
      ]);
    }
  }, [secondEvent]);

  const { red, yellow, blue } = eventData;

  const cardStyle = {
    flex: '1',
    marginRight: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0px',
    overflow: 'hidden'
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCheckboxChange = (color) => (event) => {
    setSelectedColors({ ...selectedColors, [color]: event.target.checked });
  };
  const handleSubmit = async () => {
    try {
      let selectedColorIndex = -1;

      Object.entries(selectedColors).forEach(([color, isChecked]) => {
        if (isChecked) {
          switch (color) {
            case 'red':
              selectedColorIndex = 0;
              break;
            case 'blue':
              selectedColorIndex = 2;
              break;
            case 'yellow':
              selectedColorIndex = 1;
              break;
            default:
              break;
          }
        }
      });

      if (selectedColorIndex === -1) {
        console.error('No color selected.');
        return;
      }

      const response = await axios.post('http://20.193.153.95/lucky/winner', { color: selectedColorIndex });
      console.log('Post response:', response.data);
      handleCloseDialog();
    } catch (error) {
      console.error('Error occurred while posting data:', error);
    }
  };

  return (
    <div style={{ background:'#081A30', color:'lightblue'}}>
    <div style={{marginTop:'0px', textAlign: 'center', background:'#081A30', color:'lightblue'}}>
      <h2 style={{ color: 'lightblue', fontSize: '30px', marginBottom: '10px' }}>Spin Dashboard</h2>
      <Card style={{ ...cardStyle, background: 'linear-gradient(135deg, #2980B9, #6DD5FA)' }}>
        <CardContent>
          <p style={{ color: '#fff', fontSize: '23px', marginBottom: '10px',fontWeight:'bold' }}>Waiting Time: {timing}</p>
          <p style={{ color: '#fff', fontSize: '23px', marginBottom: '10px',fontWeight:'bold' }}>Betting Time: {number}</p>
          <p style={{ color: '#fff', fontSize: '23px', marginBottom: '10px',fontWeight:'bold' }}>Result: {result!==''?result:"Waiting for Result"}</p>
          <Button variant="contained" onClick={handleOpenDialog} style={{ background: '#FFD700', color: '#081A30', fontWeight: 'bold' }}>Place Lucky Bet</Button>
        </CardContent>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Card style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(255, 99, 71, 0.2), rgba(255, 99, 71, 0.5))' }}>
          <CardContent>
            <h3 style={{ color: '#ff6347' }}>Red Card</h3>
            <p>Total Amount Bet Placed: {red}.</p>
          </CardContent>
        </Card>
        <Card style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.2), rgba(255, 255, 0, 0.5))' }}>
          <CardContent>
            <h3 style={{ color: '#ffd700' }}>Yellow Card</h3>
            <p>Total Amount Bet Placed: {yellow}.</p>
          </CardContent>
        </Card>
        <Card style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.2), rgba(30, 144, 255, 0.5))' }}>
          <CardContent>
            <h3 style={{ color: '#1e90ff' }}>Blue Card</h3>
            <p>Total Amount Bet Placed: {blue}</p>
          </CardContent>
        </Card>
      </div>
      <Card style={{ ...cardStyle, marginTop: '20px', background: '#081A30', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <h3 style={{ color: 'lightblue', fontSize: '20px', marginBottom: '10px' }}>Last Bets</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {lastBets.map((bet, index) => (
              <Card key={index} style={{ ...cardStyle, width: '200px', margin: '10px', background: 'linear-gradient(135deg, #98acf8, #cfd9ff)' }}>
                <CardContent>
                  <h3 style={{ color: 'lightblue', fontSize: '16px', marginBottom: '10px' }}>Last Bet {index===0?'':index}</h3>
                  <p style={{ color: '#333', fontSize: '14px', marginBottom: '0' }}>{bet}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Place Lucky Bet</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Checkbox checked={selectedColors.red} onChange={handleCheckboxChange('red')} />}
            label="Red"
          />
          <FormControlLabel
            control={<Checkbox checked={selectedColors.yellow} onChange={handleCheckboxChange('yellow')} />}
            label="Yellow"
          />
          <FormControlLabel
            control={<Checkbox checked={selectedColors.blue} onChange={handleCheckboxChange('blue')} />}
            label="Blue"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
};

const MainSpinDashboard = () => {
  const [eventData, setEventData] = useState('');
  const [secondEvent, setSecondEvent] = useState(null);

  useEffect(() => {
    const socket = io('http://20.193.153.95:4000');

    socket.on('spinPlaced', (data) => {
      console.log('Received data:', data);
      setEventData(data);
    });
    socket.on('luckyBet', (data) => {
      console.log('Received data:', data);
      setSecondEvent(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#081A30' }}>
      <Header />
      <CardContainer eventData={eventData} secondEvent={secondEvent} />
      <Footer />
    </div>
  );
};

export default MainSpinDashboard;
