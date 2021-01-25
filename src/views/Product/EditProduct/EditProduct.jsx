import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Box,
    Backdrop,
    CircularProgress
} from '@material-ui/core'
// Component
import {
    ProductDetail,
    Variant,
    CombineVariant
} from './component'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { getCategory, getSubCategory } from '../../../store/actions/Master/category'
import { getWarehouse } from '../../../store/actions/Master/warehouse'
import { addProduct } from '../../../store/actions/Product/product'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
}))

const CraeteProduct = props => {
    const classes = useStyles()
    const history = useHistory()
    const {
        getCategory,
        getSubCategory,
        getWarehouse,
        addProduct,
        imageUrl,
        product: {
            loadingProductData
        },
        category: {
            categoryList,
            subCategoryList,
            loadingCategory,
            loadingSubCategory
        },
        warehouse: {
            warehouseList,
            loadingWarehouse
        }
    } = props
    const [value, setValue] = React.useState(0);

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const [formState, setFormState] = useState({
        values: {
            description: 'Masukan deskripsi produk anda disini'
        },
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

    // Variant State
    const [ variantGroupForm, setVariantGroupForm ] = useState([
        {
            name: null,
            variant: [
                {
                    name: '',
                    image_url: '',
                    hex_color: ''
                }
            ]
        }
    ])

    // Combine Variant State
    const [ combineVariant, setCombineVariant ] = useState([
        {
            variant_1: null,
            variant_2: null,
            variant_3: null,
            stock: null,
            price: null,
            weight: null
        }
    ])

    const onSubmit = () => {
        addProduct(formState.values, variantGroupForm, imageUrl, combineVariant, history)
    }

    useEffect(() => {
        getCategory()
        getSubCategory()
        getWarehouse()
    }, [ getCategory, getSubCategory, getWarehouse ])

    return loadingCategory || loadingSubCategory || loadingWarehouse || loadingProductData ?
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>
                        Create New Product
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChangeTabs}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Product" {...a11yProps(0)} />
                            <Tab label="Variasi" {...a11yProps(1)} />
                            <Tab label="Kombinasi Variasi" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        {!loadingCategory && !loadingSubCategory && (
                            <ProductDetail
                                categoryList={categoryList}
                                subCategoryList={subCategoryList}
                                warehouseList={warehouseList}
                                handleChangeTabs={handleChangeTabs}
                                formState={formState}
                                handleChange={handleChange}
                                setFormState={setFormState}
                            />
                        )}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Variant
                            handleChangeTabs={handleChangeTabs}
                            formState={formState}
                            handleChange={handleChange}
                            setFormState={setFormState}
                            variantGroupForm={variantGroupForm}
                            setVariantGroupForm={setVariantGroupForm}
                            setCombineVariant={setCombineVariant}
                            combineVariant={combineVariant}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CombineVariant
                            handleChangeTabs={handleChangeTabs}
                            formState={formState}
                            handleChange={handleChange}
                            setFormState={setFormState}
                            onSubmit={onSubmit}
                            combineVariant={combineVariant}
                            setCombineVariant={setCombineVariant}
                            variantGroupForm={variantGroupForm}
                        />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    category: state.category,
    warehouse: state.warehouse,
    product: state.product,
    imageUrl: state.productImage.urlImage,
})

export default connect(mapStateToProps, { getCategory, getSubCategory, getWarehouse, addProduct })(CraeteProduct)