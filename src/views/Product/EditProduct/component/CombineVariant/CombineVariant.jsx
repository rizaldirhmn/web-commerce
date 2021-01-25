import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Button,
    TextField,
    IconButton,
    Tooltip
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}))

const CombineVariant = props => {
    const classes = useStyles()
    const {
        // handleChangeTabs,
        // formState,
        // handleChange,
        // setFormState,
        onSubmit,
        combineVariant,
        setCombineVariant,
        variantGroupForm,
    } = props

    const handleAddCombination = () => {
        setCombineVariant([...combineVariant, {
            variant_1: null,
            variant_2: null,
            variant_3: null,
            stock: null,
            price: null,
            weight: null
        }])
    }

    const handleRemoveCombination = index => {
        const list = [...combineVariant];
        list.splice(index, 1);
        setCombineVariant(list);
    };

    const handleChangeCombine = (item, index, combineIndex) => {
        // console.log(item, index);
        const variants = combineVariant[combineIndex];
        variants[`variant_${index+1}`] = item;
        combineVariant[combineIndex] = variants;
    }
    
    const handleChangeData = (e, combineIndex) => {
        const variants = combineVariant[combineIndex];
        variants[e.target.name] = e.target.value
        combineVariant[combineIndex] = variants

    }
    
    return (
        <Fragment className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>
                    <Button className={classes.button} onClick={handleAddCombination}>
                        + Kombinasi Baru
                    </Button>
                </Grid>
            </Grid>
                {combineVariant.map((itemCombine, combineIndex) => (
                    <Grid container spacing={2}>
                        {variantGroupForm.map((item, index) => (
                            <Grid item lg={2} md={2} sm={4} xs={12}>
                                <TextField
                                    fullWidth
                                    name="variant"
                                    label={`Variant ${index+1}`}
                                    placeholder={`Variant ${index+1}`}
                                    defaultValue={itemCombine[`variant_${index+1}`] || ""}
                                    onChange={e => handleChangeCombine(e.target.value, index, combineIndex)}
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                >  
                                    <option value="#">Pilih Variant {index+1}</option>
                                    {item.variant.map((varItem, varIndex) => (
                                        <option value={varItem.name}>{varItem.name}</option>
                                    ))}
                                </TextField>
                            </Grid>    
                        ))}
                        <Grid item lg={2} md={2} sm={4} xs={12}>
                            <TextField
                                fullWidth
                                name="stock"
                                label="Stok"
                                placeholder="Stok"
                                defaultValue={itemCombine.stock || ""}
                                onChange={e => handleChangeData(e, combineIndex)}
                            />
                        </Grid> 
                        <Grid item lg={2} md={2} sm={4} xs={12}>
                            <TextField
                                fullWidth
                                name="price"
                                label="Harga"
                                placeholder="Harga"
                                defaultValue={itemCombine.price || ""}
                                onChange={e => handleChangeData(e, combineIndex)}
                            />
                        </Grid> 
                        <Grid item lg={1} md={1} sm={4} xs={12}>
                            <TextField
                                fullWidth
                                name="weight"
                                label="Berat"
                                placeholder="Berat"
                                defaultValue={itemCombine.weight || ""}
                                onChange={e => handleChangeData(e, combineIndex)}
                            />
                        </Grid>
                        <Grid item lg={1} md={1} sm={4} xs={12}>
                            {combineIndex > 0 && (
                                <Tooltip arrow title="Hapus Variant">
                                    <IconButton onClick={() => handleRemoveCombination(combineIndex)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Grid>
                    </Grid>
                ))}
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
                    <Button className={classes.button} onClick={onSubmit}>
                        Simpan
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default CombineVariant