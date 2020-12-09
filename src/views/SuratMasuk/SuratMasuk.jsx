import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import TableSuratMasuk from './TableSuratMasuk'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Montserrat',
        color: '#000000'
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    textButton: {
        fontFamily: 'Montserrat',
        color: '#FFFFFF'
    }
}))

const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
))

const SuratMasuk = props => {
    const classes = useStyles()

    return(
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                justify="space-between"
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>Surat Masuk</Typography>
                </Grid>
                <Grid item>  
                    <Button className={classes.button} component={CustomRouterLink} to='/surat-masuk/form'>
                        <div className={classes.textButton}>
                            + Buat Surat Masuk
                        </div>
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
            >
                <Grid item lg={12}>
                    <TableSuratMasuk />
                </Grid>
            </Grid>
        </div>
    )
}

export default SuratMasuk