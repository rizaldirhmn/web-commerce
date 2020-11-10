import React from 'react'
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

const Home = () => {
    const classes = useStyles()

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
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                >
                    <Card className={classes.cardTeam}>
                        <Link
                            to="/dashboard"
                        >
                            <CardActionArea>
                                <CardMedia 
                                    className={classes.media}
                                    image={`${process.env.PUBLIC_URL}/images/produk/team_jari.png`}
                                    title="Contemplative Reptile"
                                />
                            </CardActionArea>
                        </Link>
                    </Card>
                    <Typography variant="body1" className={classes.titleTeam}>
                        Team Jari Solusi International
                    </Typography>
                </Grid>
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                >
                    <Card className={classes.cardTeam}>
                        <Link
                            to="/dashboard"
                        >
                            <CardActionArea>
                                <CardMedia 
                                    className={classes.media}
                                    image={`${process.env.PUBLIC_URL}/images/produk/team_sales.png`}
                                    title="Contemplative Reptile"
                                />
                            </CardActionArea>
                        </Link>
                    </Card>
                    <Typography variant="body1" className={classes.titleTeam}>
                        Team Sales & Marketing
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home