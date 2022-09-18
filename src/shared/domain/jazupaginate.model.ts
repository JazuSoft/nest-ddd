export class JazuPaginate<Type> {
  constructor(
    public items: Type[],
    public page: number,
    public pagesize: number,
    public totalitems: number,
  ) {}
}
