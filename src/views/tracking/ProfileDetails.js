import 'date-fns';
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

const states = [
  {
    value: 'alabama',
    label: 'Ca 1'
  },
  {
    value: 'new-york',
    label: 'Ca 2'
  },
  {
    value: 'san-francisco',
    label: 'Ca 3'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());

  const handleDateChange = (date) => {
    console.log('Now 1:', moment(date).fromNow());
    setSelectedDate(date);
  };

  const handleDateChange1 = (date) => {
    console.log('date: ', date, selectedDate);
    const time = moment(date).unix() - moment(selectedDate).unix();
    console.log('date: ', time);
    console.log('Now:', moment(time).get('hour'));
    setSelectedDate1(date);
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
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <KeyboardTimePicker
                  margin="normal"
                  // ampm={false}
                  id="time-picker"
                  label="Start"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="End"
                  value={selectedDate1}
                  onChange={handleDateChange1}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Note"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              variant="contained"
            >
              Save details
            </Button>
          </Box>
        </Card>
      </MuiPickersUtilsProvider>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
