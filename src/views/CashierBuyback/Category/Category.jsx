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
    content: {
        margin: 'auto',
        textAlign: 'center'
    },
    btnLink: {
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        }
    }
}))

const Category = () => {
    const classes = useStyles()

    return(
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Toolbar>
                    <Button variant="outlined" color="primary" className={classes.btnLink}>Semua Produk</Button>
                    <Button variant="contained" color="primary" className={classes.btnLink}>EOA Gold</Button>
                    <Button variant="outlined" color="primary" className={classes.btnLink}>Lainnya</Button>
                </Toolbar>
            </CardContent>
        </Card>
    )
}

export default Category