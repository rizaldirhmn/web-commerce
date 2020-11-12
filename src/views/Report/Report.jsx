import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Nunito'
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
        fontFamily: 'Nunito',
    },
}))

const Report = props => {
    const classes = useStyles()

    return(
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>Report</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Report