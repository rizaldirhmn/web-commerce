import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    CardHeader,
    Grid
} from '@material-ui/core'
import moment from 'moment';
import { options } from './chart'

// Redux
import { connect } from 'react-redux'
import { getGrafikStock } from '../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const GrafikNetIncome = (props) => {
    const { getGrafikStock, dashboard : { loadingGrafikStock, grafikStock} } = props

    useEffect(() => {
        getGrafikStock()
    }, [loadingGrafikStock, getGrafikStock])
    console.log(grafikStock)

    // var data = []
    // var jumlah=[];
    // var bulan=[];

    // if(!loadingGrafikStock || grafikStock !== null){
    //     for (var i = 0; i < grafikStock.data.length; i++) {
    //         bulan.push(moment(grafikStock.data[i].date).format('DD/MM'));
    //         jumlah.push(grafikStock.data[i].value);
    //         data = {
    //             labels: bulan,
    //             datasets: [
    //               {
    //                 label : 'Grafik Stock',
    //                 data: jumlah,
    //                 backgroundColor: 'rgba(75,192,192,0.4)',
    //               }
    //             ]
    //         };
    //     }
    
    // }else{
    //     data = {
    //         labels: ["loading"],
    //         datasets: [
    //           {
    //             label : 'Grafik Net Income',
    //             data: ["loading"],
    //             backgroundColor: 'rgba(75,192,192,0.4)',
    //             borderColor: 'rgba(75,192,192,1)',
    //             borderCapStyle: 'butt',
    //             borderDash: [],
    //             borderDashOffset: 0.0,
    //             borderJoinStyle: 'miter',
    //             pointBorderColor: 'rgba(75,192,192,1)',
    //             pointBackgroundColor: '#fff',
    //             pointBorderWidth: 1,
    //             pointHoverRadius: 5,
    //             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //             pointHoverBorderColor: 'rgba(220,220,220,1)',
    //             pointHoverBorderWidth: 2,
    //             pointRadius: 1,
    //             pointHitRadius: 10,
    //           }
    //         ]
    //     };
    // }
    // var data = {}
    
    return(
        <div>
            {/* {!loadingGrafikStock ? (
                <Card>
                    <CardHeader 
                        title="Grafik Net Income"
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            {grafikStock.map((item) => (
                                <Grid 
                                    item
                                    lg={4}
                                    md={4}
                                    sm={6}
                                    xs={12}
                                >
                                    <Pie
                                        data={data}
                                        options={options}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            ):(
                <Skeleton variant="rect" height={100}></Skeleton>
            )} */}

        </div>
    )
}

const mapStateToProps = state => ({
    dashboard: state.dashboard
})

export default connect(mapStateToProps, {getGrafikStock})(GrafikNetIncome)