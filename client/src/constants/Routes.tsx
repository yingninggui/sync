import { compile } from 'path-to-regexp';

/* Routes */
export const HOME_PAGE_ROUTE = '/';
export const SYNC_PAGE_ROUTE = '/sync/:syncID';
export const PROFILE_PAGE_ROUTE = '/profile';
export const LOGIN_PAGE_ROUTE = '/login';

/* Route Generators */
export const toSyncPageRoute = compile(SYNC_PAGE_ROUTE);

/* Route Getters */
export const getSyncPageRoute = (syncId: number) =>
  toSyncPageRoute({ syncID: String(syncId) });
