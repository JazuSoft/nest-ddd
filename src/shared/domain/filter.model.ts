export class Filter {
  constructor(
    private _filters: Record<string, any>,
    private _order: any,
    private _pagesize: number,
    private _page: number,
  ) {}

  hasFilter(filterName: string): boolean {
    return Object.keys(this._filters).some((x) => x == filterName);
  }

  getFilter(filterName: string): any {
    return this._filters[filterName];
  }

  order(): {
    [key: string]: import('mongoose').SortOrder | { $meta: 'textScore' };
  } {
    return this._order;
  }

  pagesize(): number {
    return this._pagesize;
  }

  offset(): number {
    return this._pagesize * (this._page - 1);
  }

  page(): number {
    return this._page;
  }

  static fromQueryString(query: Record<string, any>) {
    const filters = Filter.getFiltersFromQueryString(query);
    const page = Filter.getPageFromQueryString(query);
    const pagesize = Filter.getPagesizeFromQueryString(query);
    const order = Filter.getOrderFromQueryString(query);
    return new Filter(filters, order, pagesize, page);
  }

  static getFiltersFromQueryString(query: Record<string, any>): any {
    const filters = {};
    for (const key in query) {
      if (key != 'page' && key != 'pagesize' && key != 'order') {
        filters[key] = query[key];
      }
    }
    return filters;
  }

  static getPageFromQueryString(query: Record<string, any>): number {
    return query.page || 1;
  }

  static getPagesizeFromQueryString(query: Record<string, any>): number {
    return query.pagesize || 10;
  }

  static getOrderFromQueryString(query: Record<string, any>): any {
    return query.order || { _id: 'asc' };
  }
}
