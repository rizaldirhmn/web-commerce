import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
	CardActionArea,
	CardMedia,
} from '@material-ui/core'
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles(theme => ({
	root:{
		padding: theme.spacing(2)
	},	
	cardContent: {
		width: '100%',
		height: '500px'
	},
  cardContentRoot: {
		width: '90%',
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2),
  },
  media: {
    height: 140,
	},
	title: {
		fontSize: 16,
		[theme.breakpoints.down('sm')]: {
			fontSize: 12
		},
	}
}));

const Product = () => {
	const classes = useStyles()

	return(
		<Card
			className={classes.root}
		>
			<CardContent className={classes.cardContent}>
				<PerfectScrollbar>
					<Grid
						container
					>
						<Grid
							item
							lg={4}
							md={4}
							sm={6}
							xs={12}
						>
							<Card className={classes.cardContentRoot}>
								<CardActionArea>
									<CardMedia
										square
										className={classes.media}
										image="https://api.ngampooz.com/images/120105/20200729200020.jpg"
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
											0.1 gram
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Typography variant="body2" color="textSecondary" component="p">
										Stok : <NumberFormat value="5" displayType={'text'} thousandSeparator={true} />
									</Typography>
								</CardActions>
							</Card>
						</Grid>
						<Grid
							item
							lg={4}
							md={4}
							sm={6}
							xs={12}
						>
							<Card className={classes.cardContentRoot}>
								<CardActionArea>
									<CardMedia
										square
										className={classes.media}
										image="https://api.ngampooz.com/images/120105/20200729200020.jpg"
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
											0.1 gram
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Typography variant="body2" color="textSecondary" component="p">
										Stok : <NumberFormat value="5" displayType={'text'} thousandSeparator={true} />
									</Typography>
								</CardActions>
							</Card>
						</Grid>
						<Grid
							item
							lg={4}
							md={4}
							sm={6}
							xs={12}
						>
							<Card className={classes.cardContentRoot}>
								<CardActionArea>
									<CardMedia
										square
										className={classes.media}
										image="https://api.ngampooz.com/images/120105/20200729200020.jpg"
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
											0.1 gram
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Typography variant="body2" color="textSecondary" component="p">
										Stok : <NumberFormat value="5" displayType={'text'} thousandSeparator={true} />
									</Typography>
								</CardActions>
							</Card>
						</Grid>
						<Grid
							item
							lg={4}
							md={4}
							sm={6}
							xs={12}
						>
							<Card className={classes.cardContentRoot}>
								<CardActionArea>
									<CardMedia
										square
										className={classes.media}
										image="https://api.ngampooz.com/images/120105/20200729200020.jpg"
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
											0.1 gram
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Typography variant="body2" color="textSecondary" component="p">
										Stok : <NumberFormat value="5" displayType={'text'} thousandSeparator={true} />
									</Typography>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</PerfectScrollbar>
			</CardContent>
		</Card>
	)
}

export default Product;