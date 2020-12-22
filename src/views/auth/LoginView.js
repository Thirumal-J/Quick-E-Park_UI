import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const loginErrorText = ({
  loginError:{
    display:'none'
  }
});

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const verfiyLogin = verifyLogin();
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: '',
              signInBtn:''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={values => {
              // verifyLogin(e) {
                // e.preventDefault();
                console.log(values);
                axios('http://localhost:5000/login', {
                  method: 'POST',
                  data : values,
                  headers: {
                   'Content-Type': 'application/json'
                   }})
                  .then(response => {console.log(response.data);
                  if(response.data.data.authentication) { 
                    navigate('/app/dashboard', { replace: true }, {state:{loginData:response.data.data}});
                    // this.props.history.push({'pathname':'/dashboard',state:this.state});			
                  }
                  else {
                    // this.loginError.display = "block"
                    alert("Invalid Login email or password");
                    console.log(values)
                  }
                })
                      .catch(error => {
                          // this({ errorMessage: error.message });
                       console.error('There was an error!', error);
                  });
              // }
            
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h1"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in with the registered email
                  </Typography>
                </Box>
                {/* <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box> */}
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    // fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    name="signInBtn"
                    
                  >
                    Sign in now
                  </Button>
                </Box>
                {/* <Typography
                  color="error"
                  variant="body1"
                  name="loginError"
                  align = "center"
                  // display ="none"
                >
                  Invalid Login Details
                </Typography> */}
                {/* <div className = "loginError">
                  <center><h3>Invalid email or password</h3></center>
                </div> */}
                <div className="loginError" style={{display:"none"}}>
                  <Alert severity="error">
                    <AlertTitle>Login Error</AlertTitle>
                    Invalid Login email or password — <strong>check it out!</strong>
                  </Alert>
                </div>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  {/* Don&apos;t have an account? */}
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/forgot_password"
                    variant="h6"
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
