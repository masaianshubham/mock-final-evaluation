import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePatient } from '../Redux/DocReducer/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "50%",
    margin: "20px auto",
    borderRadius: "22px",
    boxShadow: "20px 20px 60px #727576,-20px - 20px 60px #ffffff",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    padding:"10px 200px"
  },
  cover: {
    width: 200,
  },
}));


export const Cards =({name,picture,medicine,_id,age}) => {
  const classes = useStyles();
  const history = useHistory()
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleDetail = () => {
    return history.push(`/details/${_id}`)
  }

  const handleDelete = () =>{
    dispatch(deletePatient(_id,user._id))
  }
  return (
    <Card className={classes.root} >
      <CardMedia
        className={classes.cover}
        image={picture}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" onClick={handleDetail}>
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Age: {age}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Medicine: {medicine.length}
          </Typography>
          <button onClick={handleDelete}>Delete</button>
        </CardContent>
      </div>
    </Card>
  );
}

