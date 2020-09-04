import React from 'react'
// import { Pie } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    // Typography,
    Grid,
    CardHeader,
} from '@material-ui/core'

// Redux
// import { connect } from 'react-redux'
// import { getGrafikStock } from '../../../../actions/dashboard'
// import Skeleton from '@material-ui/lab/Skeleton';
import {
    StockProduct1,
    StockProduct2,
    StockProduct3,
    StockProduct4,
    StockProduct5,
    StockProduct6,
} from './components'

const GrafikNetIncome = (props) => {
    // const { getGrafikStock, dashboard : { loadingGrafikStock, grafikStock} } = props
    
    return(
        <Card>
            <CardHeader title="Grafik Stok" />
            <CardContent>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid 
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                        <StockProduct1 />
                    </Grid>
                    <Grid 
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                        <StockProduct2 />
                    </Grid>
                    <Grid 
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                        <StockProduct3 />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid 
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                        <StockProduct4 />
                    </Grid>
                    <Grid 
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                        <StockProduct5 />
                    </Grid>
                    <Grid 
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                        <StockProduct6 />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

// const mapStateToProps = state => ({
//     dashboard: state.dashboard
// })

export default GrafikNetIncome