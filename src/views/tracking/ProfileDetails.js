import 'date-fns';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { db } from 'src/services';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ users, className, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [values, setValues] = useState({
    date: moment().format('DD-MM-YYYY')
  });
  useEffect(() => {
    setValues({
      ...values,
      ...users[0]
    });
  }, [users]);

  const handleChange = event => {
    const user = users.find(item => item.id === event.target.value);

    setValues({
      ...values,
      ...user
    });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());

  const handleDateChange = date => {
    setValues({
      ...values,
      date: moment(date).format('DD-MM-YYYY')
    });
  };

  const handleDateTimeStart = date => {
    setSelectedDate(date);
  };

  const handleDateChange1 = date => {
    setSelectedDate1(date);
  };

  const handleSave = () => {
    const time = moment(selectedDate1);
    const duration = moment.duration(time.diff(selectedDate));
    const hours = duration.asHours();
    const data = {
      user: values.id,
      name: values.name,
      start: moment(selectedDate).format(),
      end: moment(selectedDate1).format(),
      date: values.date,
      hours
    };
    console.log(data, values);
    db.collection('trackings')
      .add(data)
      .then(() => {
        navigate('/app/dashboard', { replace: true });
      });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  name="user"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.id}
                  variant="outlined"
                >
                  {users.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={12} xs={12}>
                <KeyboardDatePicker
                  maxDate={new Date()}
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <KeyboardTimePicker
                  margin="normal"
                  ampm={false}
                  id="time-picker"
                  label="Start"
                  value={selectedDate}
                  onChange={handleDateTimeStart}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="End"
                  ampm={false}
                  value={selectedDate1}
                  onChange={handleDateChange1}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button color="primary" variant="contained" onClick={handleSave}>
              Save details
            </Button>
          </Box>
        </Card>
      </MuiPickersUtilsProvider>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array
};

export default ProfileDetails;
