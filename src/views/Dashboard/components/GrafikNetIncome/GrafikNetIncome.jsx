import React, { useEffect, useState } from 'react'
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

// Redux
import { connect } from 'react-redux'
import { getGrafikNetIncome } from '../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const GrafikNetIncome = (props) => {
    const { getGrafikNetIncome, dashboard : { loadingGrafik, grafikNetIncome} } = props

    // const week_ago = new Date()
    const selectedDate  = useState(new Date());

    const submitDefault = moment().subtract(7,'d').format('YYYY-MM-DD');
    const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: moment().subtract(7,'d').format('DD MMMM yyyy')
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
        getGrafikNetIncome(startDate.submit.submit, endDate.submit.submit)
    }, [loadingGrafik, getGrafikNetIncome, startDate, endDate])

    var data = {}
    var jumlah=[];
    var bulan=[];

    if(!loadingGrafik || grafikNetIncome !== null){
        for (var i = 0; i < grafikNetIncome.data.length; i++) {
            bulan.push(moment(grafikNetIncome.data[i].date).format('DD/MM'));
            jumlah.push(grafikNetIncome.data[i].value);
        }
    
        data = {
            labels: bulan,
            datasets: [
              {
                label : 'Grafik Net Income',
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
            {!loadingGrafik ? (
                <Card>
                    <CardHeader 
                        title="Grafik Net Income"
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
            ):(
                <Skeleton variant="rect" height={100}></Skeleton>
            )}

        </div>
    )
}

const mapStateToProps = state => ({
    dashboard: state.dashboard
})

export default connect(mapStateToProps, {getGrafikNetIncome})(GrafikNetIncome)