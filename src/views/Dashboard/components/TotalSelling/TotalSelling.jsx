import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
  root: {
		height: '100%',
		backgroundColor: '#011747',
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
		fontWeight: 700,
		color: '#FF9300'
	},
	numbers: {
		color: '#FF9300'
	},
	caption: {
		fontWeight: 700,
		color: '#FF9300',
		fontFamily: 'Arial',
	},
  avatar: {
    backgroundColor: '#fff',
    height: 56,
    width: 56
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

const TotalSelling = props => {
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
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL PENJUALAN
            </Typography>
						<Typography className={classes.numbers} variant="h3">
							<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
						</Typography>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            See Details
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalSelling.propTypes = {
  className: PropTypes.string
};

export default TotalSelling;
