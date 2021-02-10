import React, { useState, Fragment, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Typography, 
    Button,
    Backdrop,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    FormHelperText
} from '@material-ui/core'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import { useHistory } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'
// redux
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Montserrat'
    },
    select: {
        minHeight: 40,
    },
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        overflow: 'visible'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
}))

function equalTo(ref, msg) {
    return yup.mixed().test({
      name: 'equalTo',
      exclusive: false,
      message: msg || `must be the same`,
      params: {
        reference: ref.path,
      },
      test: function(value) {
        return value === this.resolve(ref);
      },
    });
}
yup.addMethod(yup.string, 'equalTo', equalTo);

const SchemaValidation = yup.object().shape({
    name: yup.string().required("Nama Pengguna tidak boleh kosong"),
    number_handphone: yup.string().required("Nomor Handphone tidak boleh kosong"),
    password: yup.string().required("Kata sandi tidak boleh kosong"),
    retype_password: yup.string().equalTo(yup.ref('password'), 'Kata Sandi harus sama').required('Required'),
})

const CreateUser = props => {
    const classes = useStyles()
    const history = useHistory()
    const {
        onSubmitUser,
        loadingAddSocialMedia,
        onFetchingUserRoleList,
        loadingUserRoleList,
        userRoleList
    } = props

    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });

    const [formState, setFormState] = useState({
        values: {},
    });

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: 
                event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
          }
        }));
    };

    const onSubmit = e => {
        console.log(formState.values)
        onSubmitUser(formState.values, history)
    }

    useEffect(() => {
        onFetchingUserRoleList()
    }, [onFetchingUserRoleList])

    return loadingAddSocialMedia || loadingUserRoleList || userRoleList === null ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    lg={12}
                >
                    <Typography variant="h4" className={classes.title}>
                        Buat Pengguna Baru
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xl={6}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                    >
                        <Card className={classes.card}>
                            <CardContent style={{ padding: '10px'}}>
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        xl={12}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField 
                                            fullWidth
                                            name="name"
                                            label="Nama Pengguna"
                                            defaultValue={formState.values.name || ''}
                                            onChange={handleChange}
                                            helperText={
                                                errors.name && errors.name.message
                                            }
                                            error={errors.name && true}
                                            inputRef={register}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xl={12}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField 
                                            fullWidth
                                            name="number_handphone"
                                            label="No Handphone Pengguna"
                                            defaultValue={formState.values.number_handphone || ''}
                                            onChange={handleChange}
                                            helperText={
                                                errors.number_handphone && errors.number_handphone.message
                                            }
                                            error={errors.number_handphone && true}
                                            inputRef={register}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xl={12}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField 
                                            fullWidth
                                            name="password"
                                            label="Kata Sandi"
                                            type="password"
                                            defaultValue={formState.values.password || ''}
                                            onChange={handleChange}
                                            helperText={
                                                errors.password && errors.password.message
                                            }
                                            error={errors.password && true}
                                            inputRef={register}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xl={12}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField 
                                            fullWidth
                                            name="retype_password"
                                            label="Ketik ulang Kata Sandi"
                                            type="password"
                                            helperText={
                                                errors.retype_password && errors.retype_password.message
                                            }
                                            error={errors.retype_password && true}
                                            inputRef={register}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xl={12}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <FormControl fullWidth error={errors.id_user_role & true}>
                                            <InputLabel>Jenis Keanggotaan</InputLabel>
                                            <Select
                                                native
                                                inputProps={{
                                                    name: 'id_user_role',
                                                }}
                                                value={formState.values.id_user_role || ''}
                                                onChange={handleChange}
                                                inputRef={register}
                                            >
                                                {loadingUserRoleList || userRoleList === null ? (
                                                    <Skeleton></Skeleton>
                                                ):(
                                                    <>
                                                    {userRoleList.map(item => (
                                                        <option value={item.id}>{item.role}</option>
                                                    ))}
                                                    </>
                                                )}
                                            </Select>
                                            <FormHelperText>{errors.id_user_role && errors.id_user_role.message}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    spacing={2}
                    justify='space-between'
                >
                    <Grid
                        item
                    >
                        <Typography variant="subtitle1" className={classes.title}>
                            Make sure you have a valid data
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button fullWidth variant="contained" type="submit" color="primary">Simpan</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    loadingAddSocialMedia: state.socialMedia.loadingAddSocialMedia,
    loadingUserRoleList: state.user.loadingUserRoleList,
    userRoleList: state.user.userRoleList
})

const mapDispatchToProps = dispatch => {
    return {
      onAlert: (message, status) => dispatch(actions.setAlert(message, status)),
      onSubmitUser: (formData, history) => dispatch(actions.addUser(formData, history)),
      onFetchingUserRoleList: () => dispatch(actions.fetchUserRoleList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)