import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';
import {options} from './chart'
import './roundedBar'

const useStyles = makeStyles(theme => ({
    text: {
        color: '#000000',
        fontFamily: 'Montserrat'
    }
}))

const GrafikTransactionSales = props => {
    const { 
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        grafikIncome,
        loadingGrafikIncome
    } = props
    const classes = useStyles()

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

    var data = {}
    var jumlah_trx=[]
    var bulan=[];

    if(loadingGrafikIncome || grafikIncome !== null){
        for (var i = 0; i < grafikIncome.data.length; i++) {
            // bulan.push(grafikIncome.data[i].date);
            var date = new Date(grafikIncome.data[i].date)
            bulan.push(moment(date).format('DD/MM'));
            jumlah_trx.push(grafikIncome.data[i].value);
        }
    
        data = {
            // labels: ['januari','februari','maret','april','mei','juni'],
            labels: bulan,
            datasets: [
              {
                label : 'Jumlah Income',
                // data: ['100','200','300','400','500','400'],
                data: jumlah_trx,
                backgroundColor: '#2285DF',
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderRadius: 10
              }
            ]
        };
    }
    
    return(
        <div>
                <Card>
                    <CardHeader 
                        title={`Gross Income`}
                        classes={{
                            title: classes.text
                        }}
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
                        <Bar
                            // width={100}
                            // height={400}
                            data={data}
                            options={options}
                        />
                    </CardContent>
                </Card>

        </div>
    )
}

export default GrafikTransactionSales