import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Toolbar
} from '@material-ui/core'
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'

const useStyles = makeStyles(theme => ({
    root: {
        // padding: theme.spacing(2),
        width: '100%',
        height: '100px',
        borderRadius: theme.spacing(1)
    }
}))

const Category = () => {
    const classes = useStyles()

    return(
        <Card className={classes.root}>
            <CardContent>
                <Toolbar>
                    <Button color="inherit">Semua Produk</Button>
                    <Button color="inherit">EOA Gold</Button>
                    <Button color="inherit">Lainnya</Button>
                </Toolbar>
            </CardContent>
        </Card>
    )
}

export default Category