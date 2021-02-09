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
    root: {
        height: 'auto',
        overflow: 'auto'
    },
    text: {
        color: '#000000',
        fontFamily: 'Montserrat'
    }
}))

const GrafikTransactionSales = props => {
    const { 
        year,
        setYear,
        grafikTransactionMonthly,
        loadingGrafikTransactionMonthly
    } = props
    const classes = useStyles()

    const handleYear = (date) => {
        const all = moment(date).format('YYYY');
        setYear(year => ({
            ...year,
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

    if(!loadingGrafikTransactionMonthly || grafikTransactionMonthly !== null){
        for (var i = 0; i < grafikTransactionMonthly.length; i++) {
            // bulan.push(grafikTransactionMonthly[i].date);
            // var date = new Date(grafikTransactionMonthly[i].month_year)
            // bulan.push(moment(date).format('MM YYYY'));
            bulan.push(grafikTransactionMonthly[i].month_year);
            jumlah_trx.push(grafikTransactionMonthly[i].data);
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
        <Card className={classes.root}>
            <CardHeader 
                title={`Jumlah Transaksi Perbulan`}
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
                                variant="outlined"
                                name="year"
                                views={["year"]}
                                format="yyyy"
                                value={year.submit.submit} 
                                onChange={handleYear} 
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
    )
}

export default GrafikTransactionSales