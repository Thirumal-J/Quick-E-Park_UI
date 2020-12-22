import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer.js';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));
const mapStyles = {
  width: '100%',
  height: '100%',
};
const BuyParkingTicket = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              BUY PARKING TICKET
            </Typography>
          </Grid>
          <Grid item>
            {MapContainer}  
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

BuyParkingTicket.propTypes = {
  className: PropTypes.string
};

export default BuyParkingTicket;
