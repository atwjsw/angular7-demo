import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {map, switchMap, mergeMap} from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class  AuthEffects {


  @Effect()
  authSignup = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGNUP),
      map((action: AuthActions.TrySignup) => action.payload),
      switchMap((authData: {username: string, password: string}) =>
          from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)),
        switchMap(() => from(firebase.auth().currentUser.getIdToken()),
          mergeMap((token: string) => [{type: AuthActions.SIGNUP}, {type: AuthActions.SET_TOKEN, payload: token}])
        )));

  constructor(private actions$: Actions) {}


}
