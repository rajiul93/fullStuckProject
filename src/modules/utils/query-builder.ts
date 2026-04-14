type SortDirection = 'asc' | 'desc';

export type QueryBuilderParams = {
  search?: string;
  searchFields?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: SortDirection;
};

export class QueryBuilder {
  static parse(url: URL): {
    search?: string;
    page: number;
    limit: number;
    sortBy?: string;
    sortDir: SortDirection;
  } {
    const search = url.searchParams.get('search') || undefined;
    const page = Math.max(1, Number(url.searchParams.get('page') || 1));
    const limit = Math.min(
      100,
      Math.max(1, Number(url.searchParams.get('limit') || 10)),
    );
    const sortBy = url.searchParams.get('sortBy') || undefined;
    const sortDir =
      (url.searchParams.get('sortDir') as SortDirection) === 'asc'
        ? 'asc'
        : 'desc';

    return { search, page, limit, sortBy, sortDir };
  }

  static buildMongo({
    search,
    searchFields = [],
  }: Pick<QueryBuilderParams, 'search' | 'searchFields'>) {
    if (!search || searchFields.length === 0) return {};
    const safe = escapeRegex(search.trim());
    return {
      $or: searchFields.map((field) => ({
        [field]: { $regex: safe, $options: 'i' },
      })),
    };
  }

  static buildSort({
    sortBy,
    sortDir,
  }: Pick<QueryBuilderParams, 'sortBy' | 'sortDir'>) {
    if (!sortBy) return { createdAt: -1 as const };
    return {
      [sortBy]: sortDir === 'asc' ? (1 as const) : (-1 as const),
    } as Record<string, 1 | -1>;
  }

  static paginate({
    page = 1,
    limit = 10,
  }: Pick<QueryBuilderParams, 'page' | 'limit'>) {
    const skip = (page - 1) * limit;
    return { skip, limit };
  }
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

