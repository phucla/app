import {
  merge, of
} from 'rxjs';
import { map } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';
import { db } from '../api/config';

/**
 * Users store.
 * Stream of users, conversations, and current user data
 */
export const usersStore$ = merge(
  of({ isLoading: true }),
  collectionData(db.collection('users'), 'id').pipe(
    map((users) => ({
      users,
      isLoading: false,
    }))
  )
);
