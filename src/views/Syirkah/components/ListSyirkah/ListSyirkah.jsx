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
import NumberFormat from 'react-number-format';

import '../../../../App.css'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  text: {
      fontFamily: 'Nunito',
      margin: theme.spacing(1)
  },
}));

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
                        image="images/logo/logo.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Chip label="Open" color="primary" size="small" />
                        <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                            Judul Syirkah
                        </Typography>
                        <Typography className={classes.text} variant="body1" color="textPrimary" component="p">
                            2 Jan 2021 - 5 Jan 2021
                        </Typography>
                        <Typography className={classes.text} variant="caption" color="textSecondary" component="p">
                            Target Kuota Investasi
                        </Typography>
                        <Typography className={classes.text} variant="h4">
                            <NumberFormat value="500000" displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
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
