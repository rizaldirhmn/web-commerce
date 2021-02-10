import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    List,
    ListItem,
    Typography,
    ListItemSecondaryAction,
    // IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '530px',
        overflow: 'auto'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    text: {
        fontFamily: 'Nunito',
        fontSize: '8',
    },
    textNumber: {
        fontFamily: 'Nunito',
        fontSize: '8',
        color: '#66bb6a'
    }
}));

const ProductBestseller = props => {
    const classes = useStyles()
    const {
        productBestseller
    } = props

    return (
        <Card className={classes.root}>
            <CardHeader 
                title="Produk Terlaris"
                // action={
                //     <IconButton aria-label="settings">
                //       <RefreshIcon style={{ color: '#6200EE'}} />
                //     </IconButton>
                // }
            />
            <CardContent>
                <List>
                    {productBestseller.map(item => (
                        <>
                        <ListItem>
                            <Typography className={classes.text}>
                                {item.name}
                            </Typography>
                            <ListItemSecondaryAction>
                                <Typography className={classes.textNumber}>
                                    {item.total_count}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        </>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}

export default ProductBestseller