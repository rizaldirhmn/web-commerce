import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Card, 
    CardActionArea, 
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeam } from '../../store/actions/team'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(8),
    },
    card: {
        width: '500px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%'
        },
        height: '160px',
        overflow: 'visible',
        backgroundColor: '#F5F5F7',
        boxShadow: 'none'
    },
    text: {
        fontFamily: 'Nunito'
    },
    cardTeam: {
        marginTop: theme.spacing(10)
    },
    media: {
        height: 140,
    },
    titleTeam: {
        marginTop: theme.spacing(2),
        fontFamily: 'Nunito',
        textAlign: 'center'
    }
}))

const Home = props => {
    const classes = useStyles()
    const { 
        getTeam, 
        team : { 
            teamList, 
            loadingTeam 
        } 
    } = props

    useEffect(() => {
        getTeam()
    }, [getTeam])

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid 
                    item
                    lg={12}
                >
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid 
                                container 
                                spacing={2}
                                className={classes.card}
                                alignItems="center"
                            >
                                <Grid 
                                    item 
                                    lg={6}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/images/welcome.png`} alt=""/>
                                </Grid>
                                <Grid 
                                    item
                                    alignContent="center"
                                    lg={6}
                                >
                                    <Typography variant="h2" className={classes.text}>
                                        Hello Gatot!
                                    </Typography>
                                    <Typography variant="body1" className={classes.text}>
                                        It's good to see you again
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
            >
                {!loadingTeam && teamList !== null ? (
                    <>
                    {teamList.map(team => (
                        <Grid
                            item
                            lg={3}
                            md={3}
                            sm={6}
                            xs={12}
                        >
                            <Card className={classes.cardTeam}>
                                <Link
                                    to={`/dashboard/${team.id}`}
                                >
                                    <CardActionArea>
                                        <CardMedia 
                                            className={classes.media}
                                            image={team.profile_globalconfig.logo}
                                            title="Contemplative Reptile"
                                        />
                                    </CardActionArea>
                                </Link>
                            </Card>
                            <Typography variant="body1" className={classes.titleTeam}>
                                {team.profile_globalconfig.display_name}
                            </Typography>
                        </Grid>
                    ))}
                    </>
                ):(
                    <Skeleton variant="rect" height="140"></Skeleton>
                )}
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    team : state.team
})

export default connect(mapStateToProps, { getTeam })(Home)