import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
    Chip,
    Grid
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ListSyirkah() {
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={2}
        >

            <Grid
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
            >
                <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        square
                        className={classes.media}
                        image="images/logo/logo_eoa.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Chip label="Open" color="primary" size="small" />
                    <Typography gutterBottom variant="h5" component="h2">
                        Judul Syirkah
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions> */}
                </Card>
            </Grid>
        </Grid>
    );
}
