import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root : {
        padding: theme.spacing(1)
    }
}))

const ProfileDetail = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardContent>
                <form>
                    <TextField 
                        fullWidth
                        name="nama"
                        label="Nama Akun"
                        variant="outlined"
                        defaultValue="Rizaldi Rahman"
                    />
                </form>
            </CardContent>
        </Card>
    )
}

export default ProfileDetail