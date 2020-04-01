
export class SearchParam {
  searchIn: 'titlesposts' | 'titles' | 'posts' | 'users' | 'tags';
  sortBy: 'relevance'|'postcount'|'reputation'|'joindate';
  uid: number;
  query: string;
  matchWords: 'any' | 'all';
  itemsPerPage: number;
  page: number;
  replies?: number;
  repliesFilter?: ''|'atleast';
  postedBy?: string;
  categories?: string[];
  searchChildren?: boolean;
  hasTags?: boolean;
  timeRange?: number;
  timeFilter?: ''|'newer';
  sortDirection?: '' | 'desc';
  qs?: string;
}
export function search(param: SearchParam): Promise<any>;
