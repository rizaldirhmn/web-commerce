import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    MenuItem,
    Button
} from '@material-ui/core'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import SchemaValidation from './validation'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useParams, useHistory } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { getProductCabang } from '../../../actions/product'
import { addPurchaseOrderDetail } from '../../../actions/purchaseOrder'

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
}))

const InputOrder = ({ getProductCabang, addPurchaseOrderDetail, product: { productPO, loading} }) => {
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
            harga: ''
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

    const onSelectProduct = event => {
        event.persist()
        setFormState(formState => ({
            ...formState,
            values: {
                id_product: event.target.value.id_product,
                harga: event.target.value.buy_price
            }
        }))
    }

    useEffect(() => {
        getProductCabang()
    }, [loading, getProductCabang])

    const onSubmit = (e) => {
        // e.preventDefault()
        // console.log(formState.values)
        // const slug = params.slug
        // console.log(formState, startDate.submit.submit)
        addPurchaseOrderDetail(formState.values, params.id, history)
    }

    return loading || productPO == null ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>  
    :
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
                                        // defaultValue={formState.values.id_product || ''}
                                        label="Product"
                                        margin="dense"
                                        name="id_product"
                                        onChange={onSelectProduct}
                                        helperText={
                                            errors.id_product && errors.id_product.message
                                        }
                                        error={errors.id_product && true}
                                        inputRef={register}
                                        select
                                    >
                                        {productPO.map((item) => (
                                            <MenuItem key={item.product.id} value={item.latest_price}>
                                                {item.product.name} {item.product.weight} {item.product.unit}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
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
                                        value={formState.values.harga || ''}
                                        label="Harga"
                                        margin="dense"
                                        name="harga"
                                        onChange={onSelectProduct}
                                        helperText={
                                            errors.harga && errors.harga.message
                                        }
                                        error={errors.harga && true}
                                        inputRef={register}
                                        disabled
                                    />
                                </Grid>
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
                                        defaultValue={formState.values.qty || ''}
                                        label="Qty"
                                        margin="dense"
                                        name="qty"
                                        onChange={handleChange}
                                        helperText={
                                            errors.qty && errors.qty.message
                                        }
                                        error={errors.qty && true}
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
    
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProductCabang, addPurchaseOrderDetail })(InputOrder)