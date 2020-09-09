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
import { getGrafikStock3 } from '../../../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const StockProduct1 = (props) => {
    const { getGrafikStock3, dashboard : { loadingGrafikStock3, grafikStock3} } = props

    useEffect(() => {
        const timer = setTimeout(() => {
			getGrafikStock3(3)
		}, 1000)

		return () => clearTimeout(timer)
    }, [loadingGrafikStock3, getGrafikStock3])

    let data = {}

    if(!loadingGrafikStock3 || grafikStock3 !== null){
        data = {
            labels: [ `On Hand : ${grafikStock3.stock_on_hand} `, `On Process : ${grafikStock3.stock_on_process}` ],
            datasets: [
                {
                    // label : 'Grafik Stock',
                    data: [ grafikStock3.stock_on_hand, grafikStock3.stock_on_process ],
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
            {!loadingGrafikStock3 ? (
                <Card>
                    {/* Perubahan warna grafik by Pak Faisal Ramli tgl 8 sept 2020 */}
                    <CardContent>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Emas 0,5 Gram
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Total : {grafikStock3.stock_on_hand + grafikStock3.stock_on_process}
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

export default connect(mapStateToProps, {getGrafikStock3})(StockProduct1)