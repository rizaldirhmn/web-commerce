import React, { useState, Fragment } from 'react'
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import { useHistory } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
// import { getProvince, getCities, getDistrict, getVillage } from '../../../../store/actions/province'
import { addCategory } from '../../../../store/actions/Master/category'

import UploadImage from './UploadImage'

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
    name: yup.string().required("Warehouse Name cannot be Null"),
})

const CreateCategory = props => {
    const classes = useStyles()
    const history = useHistory()
    const {
        addCategory,
        category: {
            loadingAddCategory
        }
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

    const [ imageFile, setImageFile ] = useState([])
    const [base64, setB64] = useState(null);
    const handleChangeImage = event => {
        setImageFile(event[0]);
        let reader = new FileReader();
        reader.readAsDataURL(event[0]);
        reader.onload = function(){
            setB64(reader.result);
        }
    };

    const onSubmit = e => {
        addCategory(formState.values, base64, history)
    }

    return loadingAddCategory ? 
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
                        Create New Category
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
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    name="name"
                                    label="Category Name"
                                    defaultValue={formState.values.name || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.name && errors.name.message
                                    }
                                    error={errors.name && true}
                                    inputRef={register}
                                />
                            </Grid>
                        </Grid>
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
                                <UploadImage handleChangeImage={handleChangeImage} imageFile={imageFile} />
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

const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, { addCategory })(CreateCategory)