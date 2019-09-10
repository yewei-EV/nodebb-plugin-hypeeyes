export type SortType = 'most-posts' | 'most-votes' | 'newest-to-oldest' | 'oldest-to-newest';
export class Pageable {
   start: number;
   stop: number;
   sort: SortType;
}
