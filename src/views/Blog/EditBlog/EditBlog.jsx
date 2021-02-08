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
    CircularProgress
} from '@material-ui/core'
// import {Delete as DeleteIcon} from '@material-ui/icons';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import { useHistory, useParams } from 'react-router-dom'
import CKEditor from 'ckeditor4-react';
// redux
import { connect } from 'react-redux'
// import { getProvince, getCities, getDistrict, getVillage } from '../../../../store/actions/province'
// import { addCategory } from '../../../../store/actions/Master/category'
import UploadBanner from './UploadBanner'
import * as actions from '../../../store/actions'

// import UploadImage from './UploadImage'

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

const SchemaValidation = yup.object().shape({
    title: yup.string().required("Judul Blog harus diisi"),
})

const CreateBanner = props => {
    const classes = useStyles()
    const history = useHistory()
    const params = useParams()
    const {
        onUpdateBlog,
        loadingBlogData,
        onGetDetailBlog,
        loadingBlogDetail
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

    const [image, setImage] = useState('');
    const [ base64, setB64 ] = useState('')

    const handleChangeBanner = event => {
        setImage(event)
        let reader = new FileReader();
        reader.readAsDataURL(event[0]);
        reader.onload = function(){
            setB64(reader.result);
        }
    }

    const handleChangeEditor = event => {
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            description: event.editor.getData()
          }
        }));
    };

    const onSubmit = e => {
        onUpdateBlog(params.slug, formState.values, base64, history)
    }

    useEffect(() => {
        onGetDetailBlog(params.slug, setFormState, setImage)
    }, [onGetDetailBlog, params, setFormState, setImage])


    return loadingBlogData || loadingBlogDetail ? 
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
                        Edit Blog
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                        >
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
                                    name="title"
                                    label="Judul Blog"
                                    defaultValue={formState.values.title || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.title && errors.title.message
                                    }
                                    error={errors.title && true}
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
                                <CKEditor
                                    config={{placeholder: "Masukan deskripsi Blog anda disini"}}
                                    data={formState.values.description}
                                    onChange={handleChangeEditor}
                                />
                            </Grid>
                        </Grid>
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
                                <UploadBanner image={image} handleChangeBanner={handleChangeBanner} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
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

const mapStateToProps = state => {
    return {
        loadingBlogData: state.blog.loadingBlogData,
        blogData: state.blog.blogData,
        loadingBlogDetail: state.blog.loadingBlogDetail
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onUpdateBlog: (slug, formData, image, history) => dispatch(actions.editBlogList(slug, formData, image, history)),
      onGetDetailBlog: (slug, setFormState, setImage) => dispatch(actions.fetchDetailBlog(slug, setFormState, setImage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBanner)