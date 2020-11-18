import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Button,
    Grid,
    Typography,
    Paper,
    InputBase
} from '@material-ui/core'
import TableTask from './TableTask'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Montserrat'
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '120px',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
    },
    searchRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
        width: '300px',
        [theme.breakpoints.down('sm')]: {
            width:'100%'
        }
		// marginTop: theme.spacing(2)
	},
	input: {
		marginLeft: theme.spacing(1),
        flex: 1,
        height: '35px'
	},
	iconButton: {
        padding: 10,
	},
	divider: {
        height: 28,
        margin: 4,
	},
}))

const Customer = props => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>Task</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Button className={classes.button}>
                        <div className={classes.textMenu}>
                            Add
                        </div>
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.button}>
                        <div className={classes.textMenu}>
                            Upload
                        </div>
                    </Button>
                </Grid>
                <Grid item>
                    <Paper component="form" className={classes.searchRoot}>
                        <InputBase
                            className={classes.input}
                            name="nama"
                            // value={keyword.values.keyword || ''}
                            // onClick={handleClickOpen}
                            placeholder="Cari Customer"
                            inputProps={{ 'aria-label': 'Cari Customer' }}
                        />
                        
                    </Paper>
                </Grid>
            </Grid>
            <Grid 
                container
                spacing={2}
            >
                <Grid item lg={12}>
                    <TableTask />
                </Grid>
            </Grid>
        </div>
    )
}

export default Customer