import { useEffect } from 'react';
import './Dashboard.css'; // You can create a separate CSS file for styling
import Header from './Header';
import { useState } from 'react';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';

const getShadowColor = (gradient) => {
  // Assuming gradient format is linear-gradient(angle, color1, color2)
  const colors = gradient.match(/#[0-9a-f]{6}/gi);
  if (colors && colors.length >= 2) {
    // Taking the first color from the gradient as the shadow color
    return colors[0];
  } else {
    // Default shadow color
    return 'rgba(0, 0, 0, 0.1)';
  }
};

const White3DCard = styled('div')({
  background: 'linear-gradient(135deg, #4ECDC4, #f0f0f0)',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
});

const StyledCard = styled('div')(({ gradient }) => ({
  background: gradient,
  borderRadius: '10px',
  padding: '20px',
  boxShadow: `0 4px 8px ${getShadowColor(gradient)}, 0 6px 20px ${getShadowColor(gradient)}`,
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  color: 'lightblue',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Home = () => {
  // Mock data for number of users
  const totalUsers = 1000;
  const dailyUsers = 50;

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername !== 'ashu' || storedPassword !== '54321@sHu') {
      window.location.replace('/');
    }
  }, []);

  const goToCardWindow = (type) => {
    window.open(`/${type}`)
  }

  return (
    <>
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
      <Header />
      <div style={{ position: 'relative', zIndex: 1}}>
        <White3DCard style={{background: '#081A30', borderRadius:'0px'}}>
          <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 'large', paddingBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: 'lightblue' }}>
            <h2>Total Stats</h2>
          </div>
          <div className="dashboard" >
            <StyledCard   onClick={() => goToCardWindow('users')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Total Users</h2>
              <p>Total : {totalUsers}</p>
              <p>Weekly Users: {dailyUsers}</p>
              <p>Daily Users: {dailyUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => goToCardWindow('transaction')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>All Transactions</h2>
              <p>Total Deposit: {totalUsers}</p>
              <p>Total Withdrawl: {totalUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => goToCardWindow("week")} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Weekly Transactions</h2>
              <p>Weekly Deposit: {totalUsers}</p>
              <p>Weekly Withdrawal: {dailyUsers}</p>
            </StyledCard>
            <StyledCard onClick={() =>goToCardWindow("weeklyUsers")} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Weekly Users</h2>
            </StyledCard>
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 'large', paddingBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: '#333' }}>
            
          </div>
          <div className="dashboard">
            <StyledCard onClick={() => goToCardWindow('approved')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Approved Transaction</h2>
              <p>Total : {totalUsers}</p>
              <p>Weekly Users: {dailyUsers}</p>
              <p>Daily Users: {dailyUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => goToCardWindow('pending')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Pending Transactions Requests</h2>
              <p>Total Deposit: {totalUsers}</p>
              <p>Total Withdrawl: {totalUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => goToCardWindow('daily')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Daily</h2>
              <p>Daily Deposit: {totalUsers}</p>
              <p>Daily Withdrawal: {dailyUsers}</p>
            </StyledCard>
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 'large', paddingBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: 'lightblue' }}>
            <h2>Aviator</h2>
          </div>
          <div className="dashboard">
            <StyledCard onClick={() => goToCardWindow('users')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Main Dashboard</h2>
              <p>Total : {totalUsers}</p>
              <p>Weekly Users: {dailyUsers}</p>
              <p>Daily Users: {dailyUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => goToCardWindow('products')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Bet Placed</h2>
              <p>Total Deposit: {totalUsers}</p>
              <p>Total Withdrawl: {totalUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => console.log("Sub-Dealer clicked")} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Winning/Losing Bet</h2>
              <p>Weekly Deposit: {totalUsers}</p>
              <p>Weekly Withdrawal: {dailyUsers}</p>
            </StyledCard>
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 'large', paddingBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: 'lightblue' }}>
            <h2>Mines</h2>
          </div>
          <div className="dashboard">
            <StyledCard onClick={() => goToCardWindow('users')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Main Dashboard</h2>
              <p>Total : {totalUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => goToCardWindow('products')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Bet Placed</h2>
            </StyledCard>
            <StyledCard onClick={() => console.log("Sub-Dealer clicked")} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Winning/Losing Bet</h2>
              <p>Total Winning: {totalUsers}</p>
              <p>Total Loosing: {dailyUsers}</p>
            </StyledCard>
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 'large', paddingBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: 'lightblue' }}>
            <h2>Spin</h2>
          </div>
          <div className="dashboard">
            <StyledCard onClick={() => goToCardWindow('main')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Main Dashboard</h2>
              <p>Total : {totalUsers}</p>
              <p>Weekly Users: {dailyUsers}</p>
              <p>Daily Users: {dailyUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => goToCardWindow('products')} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2>Bet Placed</h2>
              <p>Total Deposit: {totalUsers}</p>
              <p>Total Withdrawl: {totalUsers}</p>
            </StyledCard>
            <StyledCard onClick={() => console.log("Sub-Dealer clicked")} gradient="linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)">
              <h2> Winning/Losing Bets</h2>
              <p>Weekly Deposit: {totalUsers}</p>
              <p>Weekly Withdrawal: {dailyUsers}</p>
            </StyledCard>
          </div>

        </White3DCard>
      </div>
      <footer style={{ position: 'absolute',marginTop:20, bottom: 0, left: 0, width: '100%', textAlign: 'center', background: '#fff', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)', color: '#A8FF7A'}}>@2024 - Flipkart Home Dashboard</footer>
    </div>
    </>
  );
};

export default Home;
