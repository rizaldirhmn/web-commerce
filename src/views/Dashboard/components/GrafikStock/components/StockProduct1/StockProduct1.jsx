import React, { useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    // CardHeader,
    Typography,
    Grid
} from '@material-ui/core'
// import moment from 'moment';
// import { options } from './chart'

// Redux
import { connect } from 'react-redux'
import { getGrafikStock } from '../../../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const StockProduct1 = (props) => {
    const { getGrafikStock, dashboard : { loadingGrafikStock, grafikStock} } = props

    useEffect(() => {
        const timer = setTimeout(() => {
			getGrafikStock(1)
		}, 1000)

		return () => clearTimeout(timer)
    }, [loadingGrafikStock, getGrafikStock])

    let data = {}

    if(!loadingGrafikStock || grafikStock !== null){
        data = {
            labels: [ `On Hand : ${grafikStock.stock_on_hand} `, `On Process : ${grafikStock.stock_on_process}` ],
            datasets: [
                {
                    // label : 'Grafik Stock',
                    data: [ grafikStock.stock_on_hand, grafikStock.stock_on_process,  ],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                    ]
                }
            ]
        };
    
    }else{
        data = {
            labels: ["loading"],
            datasets: [
              {
                label : 'Grafik Stock',
                data: ["loading"],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ]
              }
            ]
        };
    }
    
    return(
        <div>
            {!loadingGrafikStock ? (
                <Card>
                    {/* <CardHeader 
                        title={`Emas 0.1 Gram`} 
                        action={`Total : ${grafikStock.stock_on_hand + grafikStock.stock_on_process}`}
                    /> */}
                    <CardContent>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Emas 0,1 Gram
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Total : {grafikStock.stock_on_hand + grafikStock.stock_on_process}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Pie
                            data={data}
                            // options={options}
                        />
                    </CardContent>
                </Card>
            ):(
                <Skeleton variant="rect" height={100}></Skeleton>
            )}

        </div>
    )
}

const mapStateToProps = state => ({
    dashboard: state.dashboard
})

export default connect(mapStateToProps, {getGrafikStock})(StockProduct1)