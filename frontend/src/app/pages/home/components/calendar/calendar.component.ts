import { Component, OnInit } from '@angular/core';
import MonthlyExpenseDTO from '@DTOs/monthlyExpense';
import MonthlyIncomeDTO from '@DTOs/monthlyIncome';
import { MonthlyExpenseService } from '@services/monthly-expense/monthly-expense.service';
import { MonthlyIncomeService } from '@services/monthly-income/monthly-income.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  monthlyIncomes: MonthlyIncomeDTO[] = []
  monthlyExpenses: MonthlyExpenseDTO[] = []
  loading = false
  
  constructor(
    private monthlyIncomeService: MonthlyIncomeService,
    private monthlyExpenseService: MonthlyExpenseService,
  ) {}
  
  ngOnInit(): void {
    this.loading = true
    
    this.monthlyIncomeService.upNext().subscribe(({ data }) => {
      this.monthlyIncomes = data
      this.loading = false
    })

    this.monthlyExpenseService.upNext().subscribe(({ data }) => {
      this.monthlyExpenses = data
      this.loading = false
    })
  }
}
