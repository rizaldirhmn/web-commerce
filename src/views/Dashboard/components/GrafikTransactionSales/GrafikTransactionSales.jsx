import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
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

    const submitDefault = moment().subtract(7, 'd').format('YYYY-MM-DD');
    const submitDefaultEndDate = moment({}).format('YYYY-MM-DD');
    const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: moment().subtract(7, 'd').format('YYYY-MM-DD')
        }
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
            submit: submitDefaultEndDate
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
        getGrafikTransactionSales(startDate.submit.submit, endDate.submit.submit, 'total_trx')
    }, [loadingTransactionSales, getGrafikTransactionSales, startDate, endDate])

    var data = {}
    var jumlah_trx=[]
    var bulan=[];

    if(!loadingTransactionSales || grafikTransactionSales !== null){
        for (var i = 0; i < grafikTransactionSales.data.length; i++) {
            // bulan.push(grafikTransactionSales.data[i].date);
            var date = new Date(grafikTransactionSales.data[i].date)
            bulan.push(moment_tz(date, "Europe/London").tz("Asia/Jakarta").format('DD/MM'));
            jumlah_trx.push(grafikTransactionSales.data[i].total_trx);
        }
    
        data = {
            labels: bulan,
            datasets: [
              {
                label : 'Jumlah Transaksi',
                data: jumlah_trx,
                backgroundColor: 'rgba(75,192,192,0.4)',
              }
            ]
        };
    }
    
    return(
        <div>
            {!loadingTransactionSales ? (
                <Card>
                    <CardHeader 
                        title={`Grafik Total Transaksi`}
                    />
                    <CardContent>
                        <Grid container spacing={2} justify="space-between">
                            <Grid 
                                item
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
                        <Line
                            // width={100}
                            // height={400}
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