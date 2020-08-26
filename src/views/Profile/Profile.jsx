import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Card, CardContent, TextField, Grid } from '@material-ui/core'

import { AccountImage } from './components'

const useStyles = makeStyles(theme => ({
    root : {
        padding : theme.spacing(4)
    }
}))

const Profile = () => {
    const classes = useStyles()

    const [ setBanner] = useState([]);
    const [ setB64] = useState();
    const handleChangeBanner = event => {
        setBanner(event[0]);
            let reader = new FileReader();
            reader.readAsDataURL(event[0]);
            reader.onload = function(){
            setB64(reader.result);
        // console.log(reader.result);
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <AccountImage handleChangeBanner={handleChangeBanner} />
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <Card>
                        <CardContent>
                            <TextField 
                                fullWidth
                                name="nama"
                                label="Nama Akun"
                                variant="outlined"
                                defaultValue="Rizaldi Rahman"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile