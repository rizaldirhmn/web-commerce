import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Card 
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(8)
    }
}))

const Home = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Card>
            
            </Card>
        </div>
    )
}

export default Home