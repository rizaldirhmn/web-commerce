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
    IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
                action={
                    <IconButton aria-label="settings">
                      <RefreshIcon style={{ color: '#6200EE'}} />
                    </IconButton>
                }
            />
            <CardContent>
                <List>
                    {resellerActive.map(item => (
                        <>
                        <ListItem>
                            <Typography className={classes.text}>
                                {item.name}
                            </Typography>
                            <ListItemSecondaryAction>
                                <Typography className={classes.textNumber}>
                                    {item.number_handphone}
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

export default ResellerActive