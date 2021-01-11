import React from 'react'
import { makeStyles } from '@material-ui/core/Styles'
import { 
    Button,
    Grid,
    IconButton,
    TextField,
    Tooltip
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0)
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

const Variant = props => {
    const classes = useStyles()
    const {
        variantGroupForm,
        setVariantGroupForm,
        onSubmit
    } = props

    const handleAddGroup = () => {
        setVariantGroupForm([...variantGroupForm, {
            name: '',
            variant: [
                {
                    name: '',
                    image_url: '',
                    hex_color: ''
                }
            ]
        }])
    }

    const handleAddVariant = (index) => {
        const list = [...variantGroupForm]
        list[index].variant = [...variantGroupForm[index].variant, {
            name: '',
            image_url: '',
            hex_color: ''
        }]
        setVariantGroupForm(list)
    }

    const handleChangeVariantGroup = (e, index) => {
        e.persist()

        const list = [...variantGroupForm]
        list[index] = {
            name: e.target.value,
            variant: list[index].variant
        }
        setVariantGroupForm(list)
    }

    const handleChangeVariant = (e, index, varIndex) => {
        e.persist()
        console.log(e.target.name)

        const list = [...variantGroupForm]
        list[index].variant[varIndex] = {
            ...variantGroupForm[index].variant[varIndex],
            [e.target.name] : e.target.value
        }
        setVariantGroupForm(list)
    }

    const handleRemoveGroup = index => {
        const list = [...variantGroupForm];
        list.splice(index, 1);
        setVariantGroupForm(list);
    };

    const handleRemoveVariant = (index, varIndex) => {
        const list = [...variantGroupForm];
        list[index].variant.splice(varIndex, 1)
        // list.splice(index, 1);
        setVariantGroupForm(list);
    };

    return (
        <div className={classes.root}>
            {variantGroupForm.map((item, index) => (
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={6}
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField 
                            fullWidth
                            name="group_name"
                            label="Nama Variant Group"
                            defaultValue={item.name || ''}
                            onChange={(e) => handleChangeVariantGroup(e, index)}
                            // helperText={
                            //     errors.title && errors.title.message
                            // }
                            // error={errors.title && true}
                            // inputRef={register}
                        />
                    </Grid>
                    {item.variant.map((varItem, varIndex) => (
                        <Grid
                            item
                            lg={4}
                            md={4}
                            sm={4}
                            xs={12}
                        >
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    name="name"
                                    label="Nama Variant"
                                    defaultValue={varItem.name || ''}
                                    onChange={e => handleChangeVariant(e, index, varIndex)}
                                    // helperText={
                                    //     errors.title && errors.title.message
                                    // }
                                    // error={errors.title && true}
                                    // inputRef={register}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    name="image_url"
                                    label="URL Variant (Optional)"
                                    defaultValue={varItem.image_url || ''}
                                    onChange={e => handleChangeVariant(e, index, varIndex)}
                                    // helperText={
                                    //     errors.title && errors.title.message
                                    // }
                                    // error={errors.title && true}
                                    // inputRef={register}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    name="hex_color"
                                    label="Hexa Warna (Optional)"
                                    defaultValue={varItem.hex_color || ''}
                                    onChange={e => handleChangeVariant(e, index, varIndex)}
                                    // helperText={
                                    //     errors.title && errors.title.message
                                    // }
                                    // error={errors.title && true}
                                    // inputRef={register}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={6}
                            >
                                <Tooltip arrow title="Tambah Variant">
                                    <IconButton onClick={() => handleAddVariant(index)}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                                {varIndex > 0 && (
                                    <Tooltip arrow title="Hapus Variant">
                                        <IconButton onClick={() => handleRemoveVariant(index, varIndex)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={6}
                            >
                                
                            </Grid>
                        </Grid>
                    ))}
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={2}
                        xs={12}
                    >
                        {index > 0 && (
                            <IconButton onClick={() => handleRemoveGroup(index)}>
                                <DeleteIcon />
                            </IconButton>
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
                    <Button className={classes.button} onClick={handleAddGroup}>
                        Tambah Group Variant
                    </Button>
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
                    <Button className={classes.button} onClick={onSubmit}>
                        Simpan
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Variant