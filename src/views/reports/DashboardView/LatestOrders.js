import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import { usersStore$, withObservableStream, trackings$ } from 'src/services';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import Indicator from 'src/components/Indicator';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({
  users = [], trackings = {}, className, isLoading, ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {isLoading && <Indicator />}
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date
                </TableCell>
                {
                  users.map((item) => (
                    <TableCell key={item.id}>
                      {item.name}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(trackings).map((key) => (
                <TableRow
                  hover
                  key={key}
                >
                  <TableCell>
                    {key}
                  </TableCell>
                  {
                    users.map((item) => (
                      <TableCell key={item.id}>
                        {trackings[key][item.id]}
                      </TableCell>
                    ))
                    }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
  trackings: PropTypes.object,
  isLoading: PropTypes.bool
};

export default withObservableStream(combineLatest([usersStore$, trackings$]).pipe(
  map(([orders, tracking]) => ({
    users: orders.users,
    isLoading: tracking.isLoading,
    trackings: tracking.trackings
  }))
), {}, {
  users: [],
})(LatestOrders);
