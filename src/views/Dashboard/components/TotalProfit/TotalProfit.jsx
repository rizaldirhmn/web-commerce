import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
  root: {
		height: 'auto',
		backgroundColor: '#FFFFFF',
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto',
		fontWeight: 400,
    color: '#757575',
    marginTop: theme.spacing(2)
	},
	numbers: {
		color: '#000'
	},
	caption: {
		fontWeight: 700,
		color: '#000',
		fontFamily: 'Arial',
	},
  icon: {
    height: 32,
    width: 32
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

const TotalProfit = props => {
  const { className, ...rest } = props;

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
						<Typography className={classes.numbers} variant="h3">
							<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
						</Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Total Pendapatan Bersih
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
