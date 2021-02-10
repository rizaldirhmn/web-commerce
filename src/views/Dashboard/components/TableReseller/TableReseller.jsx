import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    // IconButton,
    TableContainer,
    TableCell,
    Table,
    TableRow,
    TableBody
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles((theme) => ({
    root: {
      height: '510px',
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

const ResellerActive = props => {
    const classes = useStyles()
    const {
        resellerActive
    } = props

    return (
        <Card className={classes.root}>
            <CardHeader 
                title="Reseller Paling Aktif"
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
                            {resellerActive.map(item => (
                                <TableRow>
                                    <TableCell>
                                        <Typography className={classes.text}>
                                            {item.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className={classes.textNumber}>
                                            {item.number_handphone}
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

export default ResellerActive