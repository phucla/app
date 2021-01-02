import {
  merge, of
} from 'rxjs';
import { map } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';
import moment from 'moment';
import { db } from '../api/config';
import { formatTime } from '../../utils/trackings';

const trackingsRef = () => {
  const startDate = moment().subtract(0, 'month').format('DD-MM-YYYY');
  const endDate = moment(startDate).endOf('month').format('DD-MM-YYYY');
  console.log('startDate', startDate, endDate);
  return db.collection('trackings');
};
/**
 * Users store.
 * Stream of users, conversations, and current user data
 */
export const trackings$ = merge(
  of({ isLoading: true }),
  collectionData(trackingsRef(), 'id').pipe(
    map((trackings) => ({
      trackings: formatTime(trackings),
      isLoading: false,
    }))
  )
);
