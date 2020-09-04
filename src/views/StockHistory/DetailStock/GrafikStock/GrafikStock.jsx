import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    CardHeader,
    Grid
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';
import { options } from './chart'

const GrafikStock = (props) => {
    const { 
        detailStockHistory,
        startDate,
        endDate,
        handleEndDate,
        handleStartDate
    }  = props

    var data = {}
    var jumlah=[];
    var bulan=[];

    if(detailStockHistory !== null){
        for (var i = 0; i < detailStockHistory.length; i++) {
            bulan.push(moment(detailStockHistory[i].created_at).format('DD/MM HH:mm'));
            jumlah.push(detailStockHistory[i].qty_after);
        }
    
        data = {
            labels: bulan,
            datasets: [
              {
                label : 'Grafik History Stock',
                data: jumlah,
                backgroundColor: 'rgba(75,192,192,0.4)',
              }
            ]
        };
    }else{
        data = {
            labels: ["loading"],
            datasets: [
              {
                label : 'Grafik Net Income',
                data: ["loading"],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
              }
            ]
        };
    }
    
    return(
        <div>
            <Card>
                <CardHeader 
                    title="Grafik History Stock"
                />
                <CardContent>
                    <Grid container justify="space-between">
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker 
                                    fullWidth
                                    label="Tanggal Awal"
                                    variant="outlined"
                                    name="start_date"
                                    format="dd MMMM yyyy"
                                    value={startDate.view.view} 
                                    onChange={handleStartDate} 
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker 
                                    fullWidth
                                    label="Tanggal Akhir"
                                    variant="outlined"
                                    name="end_date"
                                    format="dd MMMM yyyy"
                                    value={endDate.view.view} 
                                    onChange={handleEndDate} 
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Line
                        width={100}
                        height={50}
                        data={data}
                        options={options}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default GrafikStock