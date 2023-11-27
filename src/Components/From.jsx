import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';
import '../App.css';
import ServerConnector from '../Api/ServerConnector';
import loading from '../Img/loading2.gif';
import { saveUserCredential } from '../Api/auth.login';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Form() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const loginService = () => {
    let hashMap = {
      _action_code: '11:ADMIN_LOGIN',
      mobile_number: mobileNumber,
      password: password,
    };
 let connector = new ServerConnector();
    connector.postData( hashMap,(data) => {
        // success method
        let loginUserType = data.data.user_type;
        let userDeatails = {
          _mobile_number: mobileNumber,
          _password: password,
          _user_seq: data.data.user_seq,
          _client_seq: data.data.client_seq,
          _user_type: loginUserType,
        };
     saveUserCredential(userDeatails);
        setShowSpinner(false);
        setShowSuccessAlert(true);
        setTimeout(() => {
          navigate('/Users');
        }, 3000);
      },
      (errorCode, errorMessage, data) => {
        // failure method
        setMobileNumberError(errorMessage);
        setPasswordError(errorMessage);
        setShowSpinner(false);
      }
    );
  };
  const handleMobileNumberChange = (event) => {
    const inputMobileNumber = event.target.value;
    setMobileNumber(inputMobileNumber);
    setMobileNumberError(inputMobileNumber.length !== 10 ? 'Mobile number must be 10 digits' : '');
  };
  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setPasswordError('');
  };
  const handleLogin = () => {
    let formValid = true;
    if (mobileNumber.length === 0) {
      setMobileNumberError('Please specify mobile number');
      formValid = false;
    }
    if (password.length === 0) {
      setPasswordError('Please specify password');
      formValid = false;
    }
    if (formValid) {
      setShowSpinner(true);
      loginService();
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
   
      {showSuccessAlert && (
        <Stack>
          <Alert severity="success">Successfully logged in!</Alert>
        </Stack>
      )}
      <TextField
        fullWidth
        label="Mobile Number"
        id="fullWidth"
        error={mobileNumberError.length !== 0}
        helperText={mobileNumberError}
        onChange={handleMobileNumberChange}
      />
      <br /><br /><br />
      <FormControl sx={{ m: 1 }} fullWidth variant="outlined" error={passwordError !== ''}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'password' : 'text'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={handlePasswordChange}
        />
        <FormHelperText className="error-message">{passwordError}</FormHelperText>
      </FormControl>

      <br /><br /><br />

      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>

      {showSpinner && (
        <div>
          <img src={loading} alt="loading" />
        </div>
      )}
    </form>
  );
}

export default Form;
