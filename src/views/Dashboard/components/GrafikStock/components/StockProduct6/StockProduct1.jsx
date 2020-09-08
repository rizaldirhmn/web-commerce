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
import { getGrafikStock6 } from '../../../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const StockProduct1 = (props) => {
    const { getGrafikStock6, dashboard : { loadingGrafikStock6, grafikStock6} } = props

    useEffect(() => {
        const timer = setTimeout(() => {
			getGrafikStock6(6)
		}, 1000)

		return () => clearTimeout(timer)
    }, [loadingGrafikStock6, getGrafikStock6])

    let data = {}

    if(!loadingGrafikStock6 || grafikStock6 !== null){
        data = {
            labels: [ `On Hand : ${grafikStock6.stock_on_hand} `, `On Process : ${grafikStock6.stock_on_process}` ],
            datasets: [
                {
                    // label : 'Grafik Stock',
                    data: [ grafikStock6.stock_on_hand, grafikStock6.stock_on_process ],
                    backgroundColor: [
                        '#36A2EB',
                        '#FF6384',
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FF6384',
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
            {!loadingGrafikStock6 ? (
                <Card>
                    {/* Perubahan warna grafik by Pak Faisal Ramli tgl 8 sept 2020 */}
                    <CardContent>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Emas 5 Gram
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Total : {grafikStock6.stock_on_hand + grafikStock6.stock_on_process}
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

export default connect(mapStateToProps, {getGrafikStock6})(StockProduct1)