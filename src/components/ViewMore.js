import React from 'react';
import styles from '../styles/Style'

import { Avatar, Backdrop, CardMedia, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';

export default function ViewMore({launch, showDetails, handleClose}){
  const classes = styles();

    return (
        <>
        {
            // launches.map((launch, _) => (
                showDetails[launch.id] &&
                <Backdrop className={classes.backdrop} open={true} >
                <Paper className={classes.cardDetailed} >
                        <Typography variant="button" component="button" className={classes.showLess} onClick={handleClose}>X
                        </Typography>
                    <Grid container>
                        <Grid item>
                        <Avatar className={classes.avatar} alt={launch.name} title={launch.name} src={launch.links.patch.small} />
                        </Grid>
                        <Grid item container direction="column" spacing={1}>
                            <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                {launch.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {launch.details}
                            </Typography>
                            {launch.rocket && <Typography variant="body2" component="p" color="textPrimary" gutterBottom>
                                Rocket: {launch.rocket}
                            </Typography>}
                            {launch.payloads.length > 0 && <Typography variant="body2" component="p" color="textPrimary" gutterBottom>
                                Payloads: {launch.payloads.map((payload, _) => (
                                payload + ','
                            ))}
                            </Typography>}
                            <Typography variant="body2" component="p" color="textSecondary">
                                Launch: {moment(launch.date_utc).format("MMMM Do YYYY, h:mm:ss a")} (UTC)
                            </Typography>
                            </Grid>
                            <Grid item xs={12} container spacing={1}>
                                <Grid item xs={6} spacing={2}>
                                {launch.links.youtube_id && <CardMedia
                                    className={classes.cover}
                                    component="iframe"
                                    src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
                                    title={launch.name}
                                />}
                                </Grid>
                                <Grid item xs={6} spacing={2}>
                                {
                                    launch.links.flickr.original.length > 0 && <Carousel>
                                        {
                                        launch.links.flickr.original.map((sliderImage, i) => (sliderImage !== "" && <Paper><img alt="SpaceX Launches" className={classes.carousel} key={i} src={sliderImage} /></Paper>))
                                        }
                                    </Carousel>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                </Backdrop>
            // ))
            }
        </>
    );
}