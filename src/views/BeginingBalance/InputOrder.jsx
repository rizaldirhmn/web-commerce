import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    MenuItem,
    Button,
    // Fab,
} from '@material-ui/core'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import SchemaValidation from './validation'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { useParams, useHistory } from 'react-router-dom'
// import AddCircle from '@material-ui/icons/AddCircle'

// Redux
import { connect } from 'react-redux'
import { getProductCabang } from '../../actions/product'
import { addFirstBalance } from '../../actions/first_balance'

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
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
}))

const InputOrder = ({ getProductCabang, addFirstBalance, product: { productPO, loading} }) => {
    const classes = useStyles()
    // const params = useParams()
    // const history = useHistory()
    
    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });

    const [productOptions, setProductOptions] = useState(
        [
            {
                id_product : '',
                qty : ''
            }
        ]
    )

	const handleAddMore = () => {
		setProductOptions([
            ...productOptions,
            {
                id_product : '',
                qty : ''
            }
        ])
    }
    
    const handleInputChange = (e, index) => {
        const productItem = [...productOptions];
        productItem[index][e.target.name] = e.target.value;

        setProductOptions(productItem);
    };

    const handleRemoveClick = index => {
        const list = [...productOptions];
        list.splice(index, 1);
        setProductOptions(list);
    };

    useEffect(() => {
        getProductCabang()
    }, [loading, getProductCabang])

    const onSubmit = (e) => {
        // e.preventDefault()
        // console.log(formState.values)
        // const slug = params.slug
        // console.log(formState, startDate.submit.submit)
        addFirstBalance(productOptions)
    }

    return loading || productPO === null ? 
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
                                {productOptions.map((prod, index) => {
                                    return (
                                        <>
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={12}
                                            xs={12}
                                            key={index}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                // defaultValue={formState.values.id_product || ''}
                                                label="Product"
                                                margin="dense"
                                                data-id={index}
                                                name="id_product"
                                                onChange={e => handleInputChange(e, index)}
                                                helperText={
                                                    errors.id_product && errors.id_product.message
                                                }
                                                error={errors.id_product && true}
                                                inputRef={register}
                                                select
                                            >
                                                {productPO.map((item) => (
                                                    <MenuItem key={item.product.id} value={item.product.id}>
                                                        {item.product.name} {item.product.weight} {item.product.unit}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                // defaultValue={formState.values.qty || ''}
                                                label="Qty"
                                                margin="dense"
                                                name="qty"
                                                data-id={index}
                                                onChange={e => handleInputChange(e, index)}
                                                helperText={
                                                    errors.qty && errors.qty.message
                                                }
                                                error={errors.qty && true}
                                                inputRef={register}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={12}
                                            xs={12}
                                        >
                                            <Button onClick={() => handleRemoveClick(index)} className={classes.btn} variant="contained" color="secondary">
                                                Remove
                                            </Button>
                                        </Grid>
                                        </>
                                    )
                                })}
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                >
                                    {/* {productOptions.length === 0 ? (
                                        <Fab variant ="extended" className={classes.btn} onClick={handleAddMore} >
                                            <AddCircle className={classes.extendedIcon} />
                                                Tambah Produk
                                        </Fab>
                                    ):(
                                        <Fab variant ="extended" className={classes.btn} onClick={handleAddMore} >
                                            <AddCircle className={classes.extendedIcon} />
                                                Tambah Produk Lain
                                        </Fab>
                                    )} */}
                                    <Button onClick={handleAddMore} variant="contained" className={classes.btn} color="primary">
                                        Tambah Form
                                    </Button>
                                    <Button variant="contained" className={classes.btn} type="submit">
                                        Simpan
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

export default connect(mapStateToProps, { getProductCabang, addFirstBalance })(InputOrder)