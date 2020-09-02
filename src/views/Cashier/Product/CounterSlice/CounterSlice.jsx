import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { 
    Button, 
    Card, 
    CardContent, 
    Paper, 
    CardActions, 
    Grid,
    IconButton,
    InputBase,
    Divider,
    CardHeader
} from '@material-ui/core';

// Redux
import { connect } from 'react-redux'
import { addToCart } from '../../../../actions/cart'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        width: '50%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            borderRadius: theme.spacing(4),
            width: '100%',
            margin: 'auto',
        },
    },
    cardNotch: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: '7px',
        borderRadius: '10px',
        border: 'none',
        width: '50%',
        [theme.breakpoints.up('md')]: {
            width: '30%'
        },
        margin: 'auto',
        backgroundColor: '#EEEEEE'
    },
    cardContent: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        margin: 'auto',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    inputComponent: {
        height: '30px',
        width:  'auto',
        border: '1px solid #D3D4D0',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 0 0 rgba(170,170,170,0.01)',
    },
    inputText: {
        color: 'rgba(0,0,0,0.87)',
        fontSize: '16px',
        letterSpacing: '0.5px',
        lineHeight: '28px',
        textAlign: 'center',
    },
    searchRoot: {
		padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
    },
	input: {
        marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
	},
}))

const CounterSlice = (props) => {
    const { handleModalClose, product, searchCustomerClear, addToCart } = props
    const classes = useStyles()
    const history = useHistory()
    const [count, setCount] = React.useState(0);
    const more = () => {
        if(count < product.product.stock){
            setCount(count + 1)
        }
    };
    const less = () => setCount(count - 1);
    const onChange = e => {
        if(count <= product.product.stock){
            setCount(+e.target.value)
        }
    }

    const onSubmit = () => {
        handleModalClose()
        addToCart(product.product.id, searchCustomerClear.status, count, history)
    }

    return (
        <Card className={classes.root}>
            <hr className={classes.cardNotch} />
            <CardHeader title={`${product.product.name} ${product.product.weight} ${product.product.unit}`} />
            <CardContent className={classes.cardContent}>
                <Paper component="form" className={classes.searchRoot}>
                    <IconButton onClick={less} className={classes.iconButton}>
                        -
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                        InputProps={classes.inputText}  
                        className={classes.inputComponent} 
                        onChange={onChange}
                        name="qty"
                        value={count} />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton onClick={more} className={classes.iconButton}>
                        +
                    </IconButton>
                </Paper>
            </CardContent>
            <CardActions>
                <Grid container spacing={2} justify="space-between">
                    <Grid item>
                        <Button variant="outlined" onClick={handleModalClose} size="medium" color="primary">
                            Batal
                        </Button>
                    </Grid>
                    <Grid item>
                        {count > 0 && (
                            <Button variant="contained" onClick={onSubmit} size="medium" color="primary">
                                Simpan
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default connect(null, { addToCart })(CounterSlice)