import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardContent,
    Button,
    Toolbar
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100px',
        borderRadius: theme.spacing(1)
    },
    btnLink: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        }
    }
}))

const Category = () => {
    const classes = useStyles()

    return(
        <Card className={classes.root}>
            <CardContent>
                <Toolbar>
                    <Button color="inherit" className={classes.btnLink}>Semua Produk</Button>
                    <Button color="inherit" className={classes.btnLink}>EOA Gold</Button>
                    <Button color="inherit" className={classes.btnLink}>Lainnya</Button>
                </Toolbar>
            </CardContent>
        </Card>
    )
}

export default Category