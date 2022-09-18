export class JzResponse<Type> {
  constructor(
    public data: Type,
    public code: any,
    public message: string = '',
    public errors: string[] = [],
  ) {}
}
