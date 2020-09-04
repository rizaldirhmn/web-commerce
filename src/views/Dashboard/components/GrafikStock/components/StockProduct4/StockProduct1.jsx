import React, { useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    // CardHeader,
    Grid,
    Typography
} from '@material-ui/core'
// import moment from 'moment';
// import { options } from './chart'

// Redux
import { connect } from 'react-redux'
import { getGrafikStock4 } from '../../../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const StockProduct1 = (props) => {
    const { getGrafikStock4, dashboard : { loadingGrafikStock4, grafikStock4} } = props

    useEffect(() => {
        const timer = setTimeout(() => {
			getGrafikStock4(4)
		}, 1000)

		return () => clearTimeout(timer)
    }, [loadingGrafikStock4, getGrafikStock4])

    let data = {}

    if(!loadingGrafikStock4 || grafikStock4 !== null){
        data = {
            labels: [ `On Hand : ${grafikStock4.stock_on_hand} `, `On Process : ${grafikStock4.stock_on_process}` ],
            datasets: [
                {
                    // label : 'Grafik Stock',
                    data: [ grafikStock4.stock_on_hand, grafikStock4.stock_on_process ],
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
            {!loadingGrafikStock4 ? (
                <Card>
                    {/* <CardHeader 
                        title="Emas 1 Gram" 
                        action={`Total : ${grafikStock4.stock_on_hand + grafikStock4.stock_on_process}`}
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
                                    Total : {grafikStock4.stock_on_hand + grafikStock4.stock_on_process}
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

export default connect(mapStateToProps, {getGrafikStock4})(StockProduct1)