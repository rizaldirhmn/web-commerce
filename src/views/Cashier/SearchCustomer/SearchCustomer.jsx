import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
  Grid, 
  Typography,
	Paper,
	TextField,
	MenuItem,
	IconButton,
	InputBase,
	Divider,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
  },
  bgColor: {
    backgroundColor: '#BCE0FD',
    height: '312px',
    position: 'absolute',
    // zIndex: 0
  },
  cardMobile: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    width: '100%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
	},
	row: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  catSearch: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(2),
		width: '100%'
  },
  catSelectSearch: {
    width: '100%',
    minWidth: 150
	},
	searchRoot: {
		padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
		width: 'auto',
		marginTop: theme.spacing(2)
	},
	input: {
    marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
	},
	fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
	},
}));

const Cashier = () => {
	const classes = useStyles();

  return (
		<div className={classes.root}>
			<div className={classes.bgColor}></div>
			<div className={classes.row}>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>Cari Customer Berdasarkan</Typography>
						<Paper 
							className={classes.catSearch}
						>
							<TextField
								select
								defaultValue='nama'
								name="params"
								// onChange={event => setCatQuery(event.target.value)}
								className={classes.catSelectSearch}
							>
								<MenuItem value='nama'>Nama</MenuItem>
								<MenuItem value='telepon'>No Telepon</MenuItem>
								<MenuItem value='no_buku_anggota'>No Buku Anggota</MenuItem>
							</TextField>
						</Paper>
					</Grid>
					{/* <Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>Tambah Customer Baru</Typography>
						<Paper 
							className={classes.catSearch}
						>
							<Button variant="outlined" startIcon={<AddUserIcon />}>
								Tambah Customer
							</Button>
						</Paper>
					</Grid> */}
				</Grid>
			</div>
			<div className={classes.row}>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>Cari Customer</Typography>
						<Paper component="form" className={classes.searchRoot}>
							<InputBase
								className={classes.input}
								name="pesan"
								placeholder="Cari Customer"
								inputProps={{ 'aria-label': 'Cari Customer' }}
							/>
							<Divider className={classes.divider} orientation="vertical" />
							<IconButton type="submit" className={classes.iconButton} aria-label="search">
								<SearchIcon />
							</IconButton>
						</Paper>
					</Grid>
					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>Tipe Customer</Typography>
						<Paper 
							className={classes.catSearch}
						>
							<InputBase
								disabled
								className={classes.catSelectSearch}
								placeholder="Tipe Customer"
								InputProps={{
									readOnly: true,
								}}
							/>
						</Paper>
					</Grid>
					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>No ID</Typography>
						<Paper 
							className={classes.catSearch}
						>
							<InputBase
								disabled
								className={classes.catSelectSearch}
								placeholder="No ID"
								InputProps={{
									readOnly: true,
								}}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
  );
};

export default Cashier;
