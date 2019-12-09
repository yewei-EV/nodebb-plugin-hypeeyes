export enum SortType {
   'most_posts' = 'most_posts',
   'most_votes' = 'most_votes',
   'newest_to_oldest' = 'newest_to_oldest',
   'oldest_to_newest' = 'oldest_to_newest',
}
export class Pageable {
   start: number;
   stop: number;
   sort: SortType;
}
