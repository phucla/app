import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { db } from '../services/firebaseAccess'
import { collectionData } from 'rxfire/firestore'
import { CategoryModel } from '../models'

const dispatch$ = new BehaviorSubject(0)
const categories$ = collectionData<CategoryModel>(
  db.collection('categories'),
  'id'
).pipe(map((categories) => categories.map((item) => ({ ...item, count: 0 }))))

export const categoriesStore$ = combineLatest([categories$, dispatch$]).pipe(
  map(([categories, discount]) => {
    return {
      categories,
      discount,
    }
  })
)

export const categoryActions = {
  updateCategories: (categories) => categories$.subscribe(categories),
  changeDiscount: (value) => dispatch$.next(value),
}
