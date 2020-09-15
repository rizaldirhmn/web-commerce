import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import { useForm } from "react-hook-form"
import { 
    Card, 
    CardActions,
    CardContent, 
    TextField, 
    Grid, 
    Button,
} from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'
import { AccountImage } from './components'
import Skeleton from '@material-ui/lab/Skeleton'

import { connect } from 'react-redux'
import { editProfile } from '../../actions/profile'

const useStyles = makeStyles(theme => ({
    root : {
        padding : theme.spacing(4)
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const Profile = (props) => {
    const { editProfile } = props
    const classes = useStyles()
    const { register, handleSubmit } = useForm()
    const history = useHistory()
    const [ setBanner] = useState([])
    const [ setB64] = useState()
    const [ url ] = useState(`${process.env.REACT_APP_BASE_URL}/user/profile`)

    const handleChangeBanner = event => {
        setBanner(event[0])
            let reader = new FileReader()
            reader.readAsDataURL(event[0])
            reader.onload = function(){
            setB64(reader.result)
        // console.log(reader.result)
        }
    };

    const [ formState, setFormState ] = useState({
        values: {}
    })
    const [ isLoading, setIsLoading ] = useState(false)
    const [ detailProfile, setDetailProfile ] = useState({})

    const handleChange = event => {
        event.persist();
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.value
            }
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('access_token');
                // console.log(`token = ${token}`);
                const result = await axios({
                    url: url,
                    method: "GET",
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Accept' : 'application/json', 
                        'Authorization' : `bearer ${token}` 
                    }
                });
                setDetailProfile(result.data)
                // console.log(result.data.name)
            } catch (error) {
              console.log(error)
            }
            setIsLoading(false);
        };
        fetchData()
    }, [url])

    const onSubmit = e => {
        editProfile(formState.values, history)
        // console.log(formState.values)
    }

    return isLoading ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop> 
    :
    <Fragment>
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            {!isLoading ? (
                                <CardContent>
                                    <TextField 
                                        fullWidth
                                        name="nama"
                                        label="Nama Akun"
                                        variant="outlined"
                                        defaultValue={detailProfile.name || ''}
                                        onChange={handleChange}
                                        inputRef={register}
                                    />
                                </CardContent>
                            ):(
                                <Skeleton variant="rect"></Skeleton>
                            )}
                            <CardActions>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Simpan
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Fragment>
}

export default connect(null, { editProfile })(Profile)