import { useFileHandler, useInputValidation } from '6pp';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography, } from '@mui/material';
import axios from "axios";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from '../Components/Styles/StyledComponents';
import { orange } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from '../utils/Validators';
// import { useStrongPassword } from '6pp';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation('');
  const bio = useInputValidation('');
  const username = useInputValidation('', usernameValidator);
  const password = useInputValidation('');
  // const password = useStrongPassword();
  const avatar = useFileHandler('single');

  const dispatch=useDispatch();

  const handleLogin = async(e) => {
    e.preventDefault();

    const config={
      withCredentials:true,
      headers:{
        'Content-Type':'application/json',
      },
    };

    try {
      const {data}=await axios.post(
      `${server}/api/v1/user/login`,
      {
      username:username.value,
      password:password.value,
      },
    config
  );
  dispatch(userExists(true))
  toast.success(data.message);

  } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }

  };

  const handleSignup = async(e) => {
    e.preventDefault();

    const formData=new FormData();
    formData.append("avatar",avatar.file);
    formData.append("name",name.value);
    formData.append("bio",bio.value);
    formData.append("username",username.value);
    formData.append("password",password.value);

    const config={
          withCredentials:true,
          headers:{
            "Content-Type":"multipart/form-data",
          }
        };

    try {
      const {data}=await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{
      backgroundImage:{orange}
    }}>
    <Container
      component={'main'}
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{ width: '100%', marginTop: '1rem' }}
              onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />

              <Button
                fullWidth
                sx={{ marginTop: '1rem' }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>

              <Typography align="center" sx={{ marginTop: 2, marginBottom: 1 }}>
                OR
              </Typography>

              <Button fullWidth variant="text" onClick={toggleLogin}>
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              style={{ width: '100%', marginTop: '1rem' }}
              onSubmit={handleSignup}
            >
              <Stack position={'relative'} margin={'auto'} width={'10rem'}>
                <Avatar
                  sx={{
                    height: '10rem',
                    width: '10rem',
                    objectFit: 'contain',
                  }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: '0',
                    color: 'white',
                    bottom: '0',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    ':hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>
              {avatar.error && (
                <Typography
                  m={'1rem auto'}
                  width={'fit-content'}
                  display={'block'}
                  color="error"
                  variant="caption"
                >
                  {avatar.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                error={!!username.error}
                helperText={username.error || ""} 
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {usernameValidator.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              {/* 
              {password.error && (
                <Typography color='error' variant='caption'>
                  {password.error}
                </Typography>
              )} 
              */}

              <Button
                fullWidth
                sx={{ marginTop: '1rem' }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>

              <Typography align="center" sx={{ marginTop: 2, marginBottom: 1 }}>
                OR
              </Typography>

              <Button fullWidth variant="text" onClick={toggleLogin}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container></div>
  );
};

export default Login;

