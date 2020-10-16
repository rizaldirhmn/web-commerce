import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import PaymentIcon from '@material-ui/icons/People'

const useStyles = makeStyles(theme => ({
  root: {
		height: '100%',
		backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
		fontWeight: 500,
    color: '#000000',
    fontSize: '18px'
	},
	numbers: {
		color: '#FF9300'
	},
	caption: {
		fontWeight: 700,
		color: '#000000',
		fontFamily: 'Arial',
	},
  avatar: {
    backgroundColor: '#fff',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32,
    color: '#BFC1CB'
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Investor = props => {
  const { className, item, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Investor
            </Typography>
						<Typography className={classes.numbers} variant="h3">
							<NumberFormat value={item} displayType={'text'} thousandSeparator={true} />
						</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PaymentIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Investor.propTypes = {
  className: PropTypes.string
};

export default Investor;
