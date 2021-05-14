import React from 'react';
// import './App.css';
import styles from '../styles/Style'
import ViewMore from './ViewMore'

import { Avatar, Card, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';


export default function GridView({ handleClose, launches, showDetails, view, viewDetails}){
  const classes = styles();

  return(
      <>
      {launches.map((launch, _) => (
            (view === 'grid') && <>
            { 
            <Card className={classes.card} onClick={() => viewDetails(launch.id)}>
                <div className={classes.details}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        {launch.name}
                        </Typography>
                        <Typography variant="body2" component="p" color="textPrimary">
                        {(launch.details && (launch.details).length > 200) ? (launch.details).substring(0, 200) + "..." : (launch.details)}
                        </Typography>
                        <Typography variant="body2" component="p" color="textSecondary">
                        Launch: {moment(launch.date_utc).format("MMMM Do YYYY, h:mm:ss a")} (UTC)
                        </Typography>
                    </CardContent>
                </div>
                <Avatar className={classes.avatar} alt={launch.name} title={launch.name} src={launch.links.patch.small} />
            </Card>}
            {showDetails[launch.id] && 
            <ViewMore showDetails={showDetails} launch={launch} handleClose={handleClose}/>}
            </>
        ))}
      </>

  );
}
