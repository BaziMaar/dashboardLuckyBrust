import { useState } from 'react';
import { styled } from '@mui/system';
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StyledCard = styled(Card)({
  minWidth: 300,
  padding: '16px',
  borderRadius: '20px',
 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
 
  background:'#ABE5D7'
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
  borderRadius:20,
  border:1,
  borderColor:'#001B48'
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '16px',
  background: '#001B48',
  color: '#A8FF7A',
  boxShadow: `0 2px 4px rgba(0, 0, 0, ${theme.palette.mode === 'light' ? 0.2 : 0.4})`,
}));

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if(formData.username==='ashu' && formData.password==='54321@sHu'){
      alert("Admin Logged In Successfully!");
      localStorage.setItem('username', formData.username);
      localStorage.setItem('password', formData.password);
      window.location.replace('/home');
      setFormData({username: '', password: ''});
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
<header style={{ flex: 'none', textAlign: 'center', padding: '20px', width: '97.4%', position: 'relative', background: '#102339' }}>
  <div style={{ fontWeight: 'bold', fontSize: 'xxx-large', fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: '#333' }}>
    <a href="/" style={{ textDecoration: 'none', color: 'lightblue' }}>Bazi Maar Dashboard</a>
  </div>
</header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',backgroundColor:'#081A30' }}>
        <StyledCard  >
          <CardContent>
            <Typography variant="h5" component="h2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color:'black'}}  gutterBottom>
              User Login
            </Typography>
            <br />
            <StyledForm noValidate autoComplete="off">
              <StyledTextField style={{color:'lightblue'}}
                label="👤Username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange('username')}
              />
              <StyledTextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleLogin}
                text
              >
                Login
              </StyledButton>
            </StyledForm>
          </CardContent>
        </StyledCard>
      </div>
      <footer>

      </footer>
    </div>
  );
};

export default Login;
