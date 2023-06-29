import { Controller, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BaseController from 'src/shared/classes/BaseController';
import { MonthlyExpenseService } from '../service/monthly-expense.service';

@ApiTags('monthly-expenses')
@Injectable()
@Controller('monthly-expenses')
export class MonthlyExpenseController extends BaseController {
  constructor(service: MonthlyExpenseService) { 
    super(service) 
  }
}