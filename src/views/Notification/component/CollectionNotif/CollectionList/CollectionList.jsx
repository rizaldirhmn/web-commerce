import React, { useEffect, Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid,
    Typography,
    Button,
    Avatar,
    Paper,
    InputBase,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'

import { connect } from 'react-redux'
import * as actions from '../../../../../store/actions';
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    table: {
        width: '100%',
    },
    title: {
        fontFamily: 'Montserrat'
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat'
    },
    rootList: {
        width: '100%',
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    searchRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
        width: '300px',
        [theme.breakpoints.down('sm')]: {
            width:'100%'
        }
		// marginTop: theme.spacing(2)
	},
	input: {
		marginLeft: theme.spacing(1),
        flex: 1,
        height: '35px',
        fontFamily: 'Montserrat'
	},
	iconButton: {
        padding: 10,
	},
	divider: {
        height: 28,
        margin: 4,
	},
}))

const Collection = props => {
    const classes = useStyles()
    const {
        onFetchCollection,
        collectionList,
        loadingFetchCollection,
        handleChangeProduct
    } = props

    const [ page, setPage ] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [keyword, setKeyword] = useState('')

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    } 

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeSearch = event => {
        // setKeyword(event.target.value)
        setInterval(setKeyword(event.target.value), 5000)
        setPage(0)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            onFetchCollection(keyword, page+1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [ page, keyword, onFetchCollection ])


    return (
        <Fragment>
            <div className={classes.root}>
                <Grid
                    container
                    spacing={2}
                    justify="space-between"
                >
                    <Grid item>  
                        <Typography variant="h4" className={classes.title}>
                            List Koleksi
                        </Typography>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    spacing={2}
                >
                    <Grid item>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="keyword"
                                value={keyword || ''}
                                onChange={handleChangeSearch}
                                placeholder='Cari Koleksi'
                                inputProps={{ 'aria-label': 'Cari Customer' }}
                            />
                            
                        </Paper>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                >
                    <TableContainer>
                        <Table>
                            {!loadingFetchCollection && collectionList !== null ? (
                                <TableBody>
                                    {collectionList.data.map((item, index) => (
                                        <TableRow>
                                            <TableCell>
                                                <Avatar alt={item.name} src={item.image} />
                                            </TableCell>
                                            <TableCell>
                                                {item.name}
                                            </TableCell>
                                            <TableCell>
                                                <Button className={classes.button} onClick={() => handleChangeProduct(item)}>
                                                    Pilih
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ):(
                                <TableBody>
                                    <TableRow>
                                        <TableCell colsPan={3}>
                                            <Skeleton></Skeleton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}

                        </Table>
                    </TableContainer>
                </Grid>
                {!loadingFetchCollection && collectionList !== null ? (
                    <Grid
                        container
                        spacing={2}
                        justify="space-between"
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Total : {collectionList.total}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TablePagination
                                rowsPerPageOptions={[15]}
                                component="div"
                                count={collectionList.total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                ):(
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Skeleton style={{ width: '100%'}}></Skeleton>
                        </Grid>
                    </Grid>
                )}
            </div>
        </Fragment>
    )
    
}

const mapStateToProps = state => ({
    collectionList: state.collection.collectionList,
    loadingCollection: state.collection.loadingFetchCollection
})

const mapDispatchToProps = dispatch => {
    return {
      onFetchCollection: (keyword, page) => dispatch(actions.fetchCollection(keyword,page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)