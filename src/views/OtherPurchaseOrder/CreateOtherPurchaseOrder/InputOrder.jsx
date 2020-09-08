import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Button,
    Paper,
    IconButton,
    Typography,
    Divider
} from '@material-ui/core'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import SchemaValidation from './validation'
import { useParams, useHistory } from 'react-router-dom'
import NumberFormat from 'react-number-format'

// Redux
import { connect } from 'react-redux'
import { addPurchaseOrderDetail } from '../../../actions/otherPurchaseOrder'

const useStyles = makeStyles(theme => ({
    root: {
        // padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btn: {
        backgroundColor: '#FF9300',
        color : '#FFFFFF',
        marginTop: theme.spacing(1)
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    searchRoot: {
		// padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
		width: 'auto',
		marginTop: theme.spacing(1)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 25,
        margin: 4,
    },
}))

const InputOrder = (props) => {
    const { addPurchaseOrderDetail } = props
    const classes = useStyles()
    const params = useParams()
    const history = useHistory()
    
    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });
    
    const [formState, setFormState] = useState({
        isValid: false,
        values: {
            id_product: '',
            harga: '',
            qty: ''
        },
        touched: {},
        errors: {}
    });

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: event.target.value
          }
        }));
    };

    const handleChangePrice = event => {
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: event.target.value
          }
        }));
    };

    const onSubmit = (e) => {
        addPurchaseOrderDetail(formState.values, params.id, history)
    }

    return (
        <Fragment>
            <div className={classes.root}>
                <div className={classes.row}>
                    <Card>
                        <CardHeader 
                            title="Input Order"
                        />
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={formState.values.description || ''}
                                            label="Deskripsi"
                                            margin="dense"
                                            name="description"
                                            onChange={handleChange}
                                            helperText={
                                                errors.description && errors.description.message
                                            }
                                            error={errors.description && true}
                                            inputRef={register}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        sm={12}
                                        xs={12}
                                    >
                                        <Paper component="form" className={classes.searchRoot}>
                                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                                <Typography variant="subtitle2">Rp</Typography>
                                            </IconButton>
                                            <Divider className={classes.divider} orientation="vertical" />
                                            <NumberFormat
                                                {...props}
                                                value={formState.values.value || ''}
                                                name="value"
                                                customInput={TextField}
                                                type="text"
                                                thousandSeparator
                                                onValueChange={({ value: v }) => handleChangePrice({ target : { name : 'value', value: v} })}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        sm={12}
                                        xs={12}
                                    >
                                        <Button type="submit" variant="contained" className={classes.btn}>
                                            Tambah
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Fragment>
    )
    
}

export default connect(null, { addPurchaseOrderDetail })(InputOrder)