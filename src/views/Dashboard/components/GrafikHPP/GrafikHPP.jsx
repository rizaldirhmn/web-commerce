import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    MenuItem,
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
import { getGrafikHPP } from '../../../../actions/dashboard'
import Skeleton from '@material-ui/lab/Skeleton';

const GrafikHPP = (props) => {
    const { getGrafikHPP, dashboard : { loadingGrafikHPP, grafikHPP} } = props

    const [selectedDate ] = useState(new Date());

    const [ formState, setFormState ] = useState({
        values : {
            id_product : '4',
        }
    })

    const handleChange = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
				[event.target.name]:
				event.target.type === 'checkbox'
					? event.target.checked
					: event.target.value
            }
        }))
    }

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

    const submitDefaultEndDate = moment().format('YYYY-MM-DD');
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
        getGrafikHPP(formState.values.id_product, startDate.submit.submit, endDate.submit.submit)
    }, [loadingGrafikHPP, getGrafikHPP, startDate, endDate, formState])

    var data = {}
    var jumlah=[];
    var bulan=[];

    if(!loadingGrafikHPP || grafikHPP !== null){
        for (var i = 0; i < grafikHPP.data.length; i++) {
            // bulan.push(grafikHPP.data[i].date);
            var date = new Date(grafikHPP.data[i].date)
            bulan.push(moment_tz(date, "Europe/London").tz("Asia/Jakarta").format('DD/MM HH:mm'));
            jumlah.push(grafikHPP.data[i].hpp);
        }
    
        data = {
            labels: bulan,
            datasets: [
              {
                label : 'Grafik HPP',
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
                label : 'Grafik HPP',
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
            {!loadingGrafikHPP ? (
                <Card>
                    <CardHeader 
                        title={`Grafik HPP`}
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid 
                                item
                                lg={3}
                                md={3}
                                sm={12}
                                xs={12}
                            >
                                {/* <InputLabel></InputLabel> */}
                                <TextField 
                                    select
                                    fullWidth
                                    name="id_product"
                                    label="Produk"
                                    value={formState.values.id_product}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="1">Emas 0,1 Gram</MenuItem>
                                    <MenuItem value="2">Emas 0,2 Gram</MenuItem>
                                    <MenuItem value="3">Emas 0,5 Gram</MenuItem>
                                    <MenuItem value="4">Emas 1 Gram</MenuItem>
                                    <MenuItem value="5">Emas 2 Gram</MenuItem>
                                    <MenuItem value="6">Emas 5 Gram</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid 
                                item
                                lg={3}
                                md={3}
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
                                lg={3}
                                md={3}
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
                        <Line
                            // width={100}
                            // height={50}
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

export default connect(mapStateToProps, {getGrafikHPP})(GrafikHPP)