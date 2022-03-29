import { User } from './../models/User';
import { createAction, props } from '@ngrx/store';

export const buildUserSession = createAction('[Users] Build User Session');

export const buildUserSessionSuccess = createAction('[Users] Build User Session Success', props<{ user: User }>());

export const buildUserSessionFailure = createAction('[Users] Build User Session Failure');
