import { from, Observable, timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Joke } from './types'

const URL = 'http://api.icndb.com/jokes/random/'

// We parse XHR response and return the JSON as a Promise of an array of interface Joke
async function mapResponse(res: any): Promise<Joke[] | null> {
  const data = await res.json()
  return res.ok ? data.value.map((j: JSON) => ({ ...j })) : null
}

// We fetch jokes from the API and return an Observable derived from Promise
export function makeRequest(qty: number): Observable<Joke[] | null> {
  return from(fetch(URL + qty)).pipe(switchMap(res => mapResponse(res)))
}

// This function makes requests to the API every 5s until it's stopped
export function startPolling(): Observable<Joke[] | null> {
  return timer(10, 5000).pipe(switchMap(() => makeRequest(1)))
}
