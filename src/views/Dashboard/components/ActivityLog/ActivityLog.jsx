import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    List,
    ListItem,
    Typography,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WatchIcon from '@material-ui/icons/Timer'
import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles((theme) => ({
    root: {
      height: 466
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: '8',
    },
    textNumber: {
        fontFamily: 'Roboto',
        fontSize: '8',
        color: '#66bb6a'
    }
  }));

const ActivityLog = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardHeader 
                title="Aktivitas"
                action={
                    <IconButton aria-label="settings">
                      <RefreshIcon style={{ color: '#6200EE'}} />
                    </IconButton>
                }
            />
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <WatchIcon style={{ color: '#6200EE'}} />
                        </ListItemIcon>
                        <Typography className={classes.text}>
                            Transaksi Pembayaran Baru
                        </Typography>
                        <ListItemSecondaryAction>
                            <Typography className={classes.textNumber}>
                                467
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <WatchIcon style={{ color: '#00E676'}} />
                        </ListItemIcon>
                        <Typography className={classes.text}>
                            Transaksi Pengiriman Baru
                        </Typography>
                        <ListItemSecondaryAction>
                            <Typography className={classes.textNumber}>
                                10
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default ActivityLog