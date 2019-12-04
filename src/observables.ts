import { from, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Joke } from './types';

const URL = 'http://api.icndb.com/jokes/random/'

async function mapResponse(res: any): Promise<Joke[] | null> {
  const data = await res.json()
  return res.ok ? data.value.map((j: JSON) => ({...j, saved: false})) : null
}

export function makeRequest(qty: number): Observable<Joke[] | null> {
  return from(fetch(URL + qty)).pipe(switchMap(res => mapResponse(res)))
}
