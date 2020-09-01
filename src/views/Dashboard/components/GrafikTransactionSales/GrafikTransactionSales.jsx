import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';
import moment_tz from 'moment-timezone'
import {options} from './chart'

// Redux
import { connect } from 'react-redux'
import { getGrafikTransactionSales } from '../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const GrafikTransactionSales = (props) => {
    const { getGrafikTransactionSales, dashboard : { loadingTransactionSales, grafikTransactionSales} } = props

    const [selectedDate ] = useState(new Date());

    const submitDefault = moment({}).format('YYYY-MM-DD');
    const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {selectedDate}
    });
    const handleStartDate = (date) => {
    const changeDate = moment(date).format('YYYY-MM-DD');
        setStartDate(startDate => ({
            ...startDate,
                submit: {
                    submit: changeDate
            },
                view: {
                    view: date
            }
        }));
    };

    const [ endDate, setEndDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {selectedDate}
    });
    const handleEndDate = (date) => {
    const all = moment(date).format('YYYY-MM-DD');
        setEndDate(endDate => ({
            ...endDate,
            submit: {
                submit: all
            },
            view: {
                view: date
            }
        }));
    };

    useEffect(() => {
        getGrafikTransactionSales(startDate.submit.submit, endDate.submit.submit)
    }, [loadingTransactionSales, getGrafikTransactionSales, startDate, endDate])

    var data = {}
    var jumlah_trx=[]
    var jumlah_uang=[]
    var bulan=[];

    if(!loadingTransactionSales || grafikTransactionSales !== null){
        for (var i = 0; i < grafikTransactionSales.data.length; i++) {
            // bulan.push(grafikTransactionSales.data[i].date);
            var date = new Date(grafikTransactionSales.data[i].date)
            bulan.push(moment_tz(date, "Europe/London").tz("Asia/Jakarta").format('DD/MM'));
            jumlah_trx.push(grafikTransactionSales.data[i].total_trx);
            jumlah_uang.push(grafikTransactionSales.data[i].jumlah_uang);
        }
    
        data = {
            labels: bulan,
            datasets: [
              {
                label : 'Jumlah Transaksi',
                type: 'line',
                data: jumlah_trx,
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
              },
              {
                type: 'bar',
                label: 'Jumlah Uang',
                data: jumlah_uang,
                fill: false,
                backgroundColor: '#71B37C',
                borderColor: '#71B37C',
                hoverBackgroundColor: '#71B37C',
                hoverBorderColor: '#71B37C',
                yAxisID: 'y-axis-1'
              }
            ]
        };
    }
    
    return(
        <div>
            {!loadingTransactionSales ? (
                <Card>
                    <CardHeader 
                        title={`Grafik Harga Emas`}
                    />
                    <CardContent>
                        <Grid container spacing={2} justify="space-between">
                            <Grid 
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
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
                            <Grid 
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
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
                        <Bar
                            // width={100}
                            height={400}
                            data={data}
                            options={options}
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

export default connect(mapStateToProps, {getGrafikTransactionSales})(GrafikTransactionSales)