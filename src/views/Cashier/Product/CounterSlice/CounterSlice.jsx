import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { 
    Button, 
    Card, 
    CardContent, 
    Paper, 
    CardActions, 
    Grid,
    IconButton,
    InputBase,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        width: '50%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            borderRadius: theme.spacing(4),
            width: 'auto'
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
    const { handleModalClose } = props
    const classes = useStyles()
    const [count, setCount] = React.useState(1);
    const more = () => setCount(count + 1);
    const less = () => setCount(count - 1);
    const onChange = e => setCount(+e.target.value);

    return (
        <Card className={classes.root}>
            <hr className={classes.cardNotch} />
            <CardContent className={classes.cardContent}>
                {/* <Typography>Masukan Jumlah</Typography> */}
                {/* <Button size="small" color="primary" variant="contained" onClick={less}>
                    -
                </Button>
                <TextField type="number" 
                    // id={cells.id} 
                    inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                    InputProps={classes.inputText}  
                    className={classes.inputComponent} 
                    onChange={onChange}
                    value={count} />
                <Button size="small" color="primary" variant="contained" onClick={more}>
                    +
                </Button> */}
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
                        <Button variant="contained" size="medium" color="primary">
                            Simpan
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default CounterSlice