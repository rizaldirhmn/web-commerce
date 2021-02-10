import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    // IconButton,
    TableContainer,
    Table,
    TableCell,
    TableBody,
    TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles((theme) => ({
    root: {
      height: 466
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

const InterestedProduct = props => {
    const classes = useStyles()
    const {
        interestedProduct
    } = props

    return (
        <Card className={classes.root}>
            <CardHeader 
                title="Produk Paling Banyak Dibagikan"
                // action={
                //     <IconButton aria-label="settings">
                //       <RefreshIcon style={{ color: '#6200EE'}} />
                //     </IconButton>
                // }
            />
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {interestedProduct.map(item => (
                                <TableRow>
                                    <TableCell>
                                        <Typography className={classes.text}>
                                            {item.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className={classes.text}>
                                            {item.count_share}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default InterestedProduct