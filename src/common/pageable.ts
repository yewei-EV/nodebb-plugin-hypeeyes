export enum SortType {
   'most-posts' = 'most-posts',
   'most-votes' = 'most-votes',
   'newest-to-oldest' = 'newest-to-oldest',
   'oldest-to-newest' = 'oldest-to-newest',
}
export class Pageable {
   start: number;
   stop: number;
   sort: SortType;
}
