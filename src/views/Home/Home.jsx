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
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeam } from '../../store/actions/team'
import { Skeleton } from '@material-ui/lab'
import { useTranslation } from 'react-i18next';
import "../../styles.scss"

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(8),
    },
    card: {
        width: '700px',
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
        fontFamily: 'Montserrat'
    },
    cardTeam: {
        marginTop: theme.spacing(10),
        width: 140,
        alignContent: 'center',
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    media: {
        height: 150,
    },
    titleTeam: {
        marginTop: theme.spacing(2),
        fontFamily: 'Montserrat',
        textAlign: 'center',
        width: '100%'
    }
}))

const Home = props => {
    const classes = useStyles()
    const history = useHistory()
    const { t } = useTranslation();
    const { 
        getTeam, 
        team : { 
            teamList, 
            loadingTeam 
        } 
    } = props

    const data = JSON.parse(sessionStorage.getItem('data'))

    const onClickTeam = event => {
        sessionStorage.setItem('team', event.profile_globalconfig.display_name)
        history.push(`/dashboard/${event.id}`)
    }

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
                                        Hello {data.display_name}!
                                    </Typography>
                                    <Typography variant="body1" className={classes.text}>
                                        {t('greetings')}
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
                            lg={2}
                            md={3}
                            sm={6}
                            xs={12}
                        >
                            <Card className={classes.cardTeam}>
                                {/* <Link
                                    to={`/dashboard/${team.id}`}
                                > */}
                                    <CardActionArea onClick={e => onClickTeam(team)}>
                                        <CardMedia 
                                            className={classes.media}
                                            image={team.profile_globalconfig.logo}
                                        />
                                    </CardActionArea>
                                {/* </Link> */}
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