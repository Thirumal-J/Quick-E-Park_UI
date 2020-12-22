import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { values } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const phoneRegex = RegExp(
  // /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
);

// const validatePassword = values => {
//   let error = "";
//   const passwordRegex = /(?=.*[0-9])/;
//   if (!values) {
//     error = "*Required";
//   } else if (values.length < 8) {
//     error = "*Password must be 8 characters long.";
//   } else if (!passwordRegex.test(values)) {
//     error = "*Invalid password. Must contain one number.";
//   }
//   return error;
// };

// const validateConfirmPassword = (pass, value) => {

//   let error = "";
//   if (pass && value) {
//     if (pass !== value) {
//       error = "Password not matched";
//     }
//   }
//   return error;
// };

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Register"
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
              fullName: '',
              licenseNumber: '',
              mobileNumber:'',
              password: '',
              confirmPassword:'',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                fullName: Yup.string().max(255).required('Full name is required'),
                licenseNumber: Yup.string().max(255).required('License Number is required'),
                // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
                mobileNumber: Yup.string().matches(phoneRegex, 'Phone number is not valid'),
                password: Yup.string().max(255).required('password is required'),
                // password: Yup.string().validatePassword(values),
                // confirmPassword: Yup.string().max(255).required('Confirm password is required'),
                // confirmPassword: Yup.string().when("password", {
                //   is: val => (val && val.length > 0 ? true : false),
                //   then: Yup.string().oneOf(
                //     [Yup.ref("password")],
                //     "Both password need to be the same"
                //   )
                // }) ,
                confirmPassword: Yup.string().required().label('Confirm Password').test('passwords-match', 'Both Passwords should match', function(value) {
                  return this.parent.password === value;
}),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={values => {
              // if (values.password == values.confirmPassword) {
              //   alert(values.password); 
              // }
              axios('http://localhost:5000/register', {
                  method: 'POST',
                  data : values,
                  headers: {
                   'Content-Type': 'application/json'
                   }})
                  .then(response => {console.log(response.data);
                  if(response.data.status_code==200) { 
                    navigate('/app/dashboard', { replace: true });
                    // this.props.history.push({'pathname':'/dashboard',state:this.state});			
                  }})
                      .catch(error => {
                          // this({ errorMessage: error.message });
                       console.error('There was an error!', error);
                  });
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
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  fullWidth
                  helperText={touched.fullName && errors.fullName}
                  label="Full name"
                  margin="normal"
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.licenseNumber && errors.licenseNumber)}
                  fullWidth
                  helperText={touched.licenseNumber && errors.licenseNumber}
                  label="License number"
                  margin="normal"
                  name="licenseNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.licenseNumber}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                  fullWidth
                  helperText={touched.mobileNumber && errors.mobileNumber}
                  label="Mobile number"
                  margin="normal"
                  name="mobileNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobileNumber}
                  variant="outlined"
                />
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
                <TextField
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirm Password"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
                  variant="outlined"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
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

export default RegisterView;
