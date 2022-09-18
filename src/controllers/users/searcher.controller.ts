import { Controller, UseGuards, HttpStatus, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@src/guards/jwt-auth.guard';
import { UserSearcher } from '@src/services/users/application/search/searcher';
import { PaginateResponse } from '@src/shared/application/jazu-response.model';
import { JzResponse } from '@src/shared/application/paginate-response.model copy';
import { UserResponse } from '@src/shared/application/user-response.model';
import { Filter } from '@src/shared/domain/filter.model';

@Controller('users')
export class UserSearcherController {
  constructor(private userSearcher: UserSearcher) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async handle(
    @Query() query,
  ): Promise<JzResponse<PaginateResponse<UserResponse>>> {
    const filter = Filter.fromQueryString(query);
    const data = await this.userSearcher.ask(filter);
    const response = new PaginateResponse<UserResponse>(
      data.items.map((x) => UserResponse.fromDomain(x)),
      data.page,
      data.pagesize,
      data.totalitems,
    );
    return new JzResponse(response, HttpStatus.OK);
  }
}
