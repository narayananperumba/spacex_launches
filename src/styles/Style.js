import { makeStyles } from '@material-ui/core/styles';

export default function Classes(){

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
        title: {
          marginRight: theme.spacing(2),
          flexGrow: 1
        },
        page: {
          display: 'flex',
          flexFlow: 'wrap',
        },
        card: {
          display: 'flex',
          flex: '1 0 auto',
          minWidth: '30%',
          margin: 4,
          [theme.breakpoints.down('md')]: {
            flex: '1 1 auto',
          },
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 475,
        },
        avatar: {
          width: theme.spacing(12),
          height: theme.spacing(12),
          margin: '4px auto',
        },
        paper: {
          position: "absolute",
          width: '30%',
          height: '30%',
          backgroundColor: theme.palette.background.paper,
          border: "2px solid #000",
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3)
        },
        carousel: {
          // maxWidth: "20%",
          // maxHeight: "200px",
          height: "250px",
          margin: 'auto',
          display: 'block',
        },
        showLess: {
          border: "1px solid #ccc",
          float: "right",
          background: "white",
          borderRadius: 3,
          cursor: "pointer"
        },
        // viewmore: {
        //   width: "100%",
        // },
        cover: {
          // width: "50%",
          height: "250px",
          [theme.breakpoints.down('sm')]: {
            width: "auto",
            height: "auto",
          },
          margin: "auto",
          display: "block"
        },
        cardDetailed: {
          width: "90%"
        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
        },
          
      }));

      return (
        useStyles()
      );

}