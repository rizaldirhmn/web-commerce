import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}))

const CreatePurchaseOrder = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">Purchase Order</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Card>
                    <CardHeader 
                        title="Purchase Order"
                    />
                    <CardContent>
                        <Grid container>
                            <Grid

                            >

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CreatePurchaseOrder