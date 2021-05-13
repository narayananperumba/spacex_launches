import React, { useEffect, useState } from 'react';
// import './App.css';
import styles from '../styles/Style'
import ListView from './ListView'
import GridView from '../components/GridView'

import LinearProgress from '@material-ui/core/LinearProgress';
import { Pagination } from '@material-ui/lab';

export default function Main({ view }){
    const classes = styles();

    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noOfPages, setNoOfPages] = useState(1);
    const [offset, setOffset] = useState(0);
    const [slice, setSlice] = useState([]);
    const [page, setPage] = useState(1);
    const [showDetails, setShowDetails] = useState({});
    const countPerPage = 50;
    
    useEffect(() => {
        fetchData();
    }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.spacexdata.com/v4/launches`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json()) // could be removed with axios
      .then(data => {
        const launches = data.sort((a, b) => new Date(a.date_utc) < new Date(b.date_utc) ? 1 : -1);
        setLaunches(launches)
        handleData(launches)
        setLoading(false);
      })
      .catch(error => {
        console.log('Looks like there was a problem: \n', error);
      });
  };

  const handleData = (launches) => {
    const slice = launches.slice(offset, offset + countPerPage)
    setNoOfPages(Math.ceil(launches.length / countPerPage));
    setSlice(slice)
  };

  const handlePagination = (event, value) => {
    setPage(value);
    const newOffset = (value - 1) * countPerPage;
    setOffset(newOffset);
    const slice = launches.slice(newOffset, newOffset + countPerPage)
    setSlice(slice)
  };

  const viewDetails = (id) => {
    const details = {}
    details[id] = true;
    setShowDetails(details);
  };

  const handleClose = () => {
    setShowDetails({});
  };
    return (
        <>
        {loading ? <LinearProgress /> : ''}
        <div className={classes.page}>
            <ListView handleClose={handleClose} showDetails={showDetails} view={view} viewDetails={viewDetails} launches={slice}/>
            <GridView handleClose={handleClose} showDetails={showDetails} view={view} viewDetails={viewDetails} launches={slice}/>
        </div>
        <Pagination count={noOfPages} color="primary" page={page} onChange={handlePagination} position="sticky" />
        </>
    );
}