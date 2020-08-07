import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import NumberFormat from 'react-number-format'

const useStyles = makeStyles(theme => ({
  root: {
		width: '100%',
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2)
	},
  imageContainer: {
    height: 100,
    width: 'auto',
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
		display: 'flex'
  },
  image: {
    width: '100%',
    objectFit: 'cover'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1)
  },
}));

const ProductCard = props => {
	const { product } = props;
	const classes = useStyles()
  return (
		<div className={classes.root}>
				<Grid
					container
					justify="space-between"
				>
					<Grid
						item
						xs={3}
					>
						<div className={classes.imageContainer}>
							<img
								alt="Product"
								className={classes.image}
								src={product.image}
							/>
						</div>
						
					</Grid>
					<Grid
						item
						xs={6}
					>
						<Typography variant='h5'>
							{product.nama}
						</Typography>
						<Typography className={classes.capDetail}>
							<NumberFormat value={product.harga} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
						</Typography>
						<Typography className={classes.capDetail}>
							Stok : {product.stok}
						</Typography>
					</Grid>
				</Grid>
		</div>
  );
};

export default ProductCard;
