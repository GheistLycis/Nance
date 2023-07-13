import { Controller, Get, Injectable, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BaseController from 'src/shared/classes/BaseController';
import { ExpenseService } from '../service/expense.service';

@ApiTags('expenses')
@Injectable()
@Controller('expenses')
export class ExpenseController extends BaseController {
  constructor(service: ExpenseService) { 
    super(service) 
  }
  
  @Get()
  async list(@Req() req, @Query() query) {
    query.tags = query.tags?.length
      ? query.tags.split(',')
      : []
    
    return await this.service.list(req['user'].id, query).then(data => ({ data }))
  }
}
