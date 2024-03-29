import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response as Res } from '@interfaces/Response';
import { environment } from 'src/environments/environment';
import YearHistory from '../../interfaces/YearHistory';
import CategoryRemaining from '../../interfaces/CategoryRemaining';
import MonthHistory from '../../interfaces/MonthHistory';
import MonthDTO from '../../DTOs/month';
import YearDTO from '../../DTOs/year';
import CategoryDTO from '../../DTOs/category';
import { RawCategoryChartData } from '../../interfaces/CategoryChartData';
import { RawTagChartData } from '../../interfaces/TagChartData';
import { RawExpenseChartData } from '../../interfaces/ExpenseChartData';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  baseRoute = 'analytics'

  constructor(private http: HttpClient) {}

  categoryRemaining(category: CategoryDTO['id']) {
    return this.http.get<Res<CategoryRemaining>>(`${environment.apiUrl}/${this.baseRoute}/category-remaining/${category}`)
  }
  
  monthBalance(month: MonthDTO['id']) {
    return this.http.get<Res<{ month: MonthDTO, balance: number }>>(`${environment.apiUrl}/${this.baseRoute}/month-balance/${month}`)
  }
  
  mostExpensiveCategory(month: MonthDTO['id']) {
    return this.http.get<Res<{ name: string, total: number }>>(`${environment.apiUrl}/${this.baseRoute}/most-expensive-category/${month}`)
  }
  
  mostExpensiveTags(month: MonthDTO['id']) {
    return this.http.get<Res<{ name: string, total: number }>>(`${environment.apiUrl}/${this.baseRoute}/most-expensive-tags/${month}`)
  }
  
  monthHistory(month: MonthDTO['id']) {
    return this.http.get<Res<Omit<MonthHistory, 'balance'>>>(`${environment.apiUrl}/${this.baseRoute}/month-history/${month}`)
  }
  
  recentExpenses(month: MonthDTO['id']) {
    return this.http.get<Res<number | '--'>>(`${environment.apiUrl}/${this.baseRoute}/recent-expenses/${month}`)
  }
  
  yearExpenses(month: MonthDTO['id']) {
    return this.http.get<Res<number | '--'>>(`${environment.apiUrl}/${this.baseRoute}/year-expenses/${month}`)
  }
  
  yearHistory(year: YearDTO['id']) {
    return this.http.get<Res<YearHistory>>(`${environment.apiUrl}/${this.baseRoute}/year-history/${year}`)
  }

  categoryChart(months: MonthDTO['id'][]) {
    return this.http.post<Res<RawCategoryChartData>>(`${environment.apiUrl}/${this.baseRoute}/category-chart`, months)
  }

  tagChart(months: MonthDTO['id'][]) {
    return this.http.post<Res<RawTagChartData>>(`${environment.apiUrl}/${this.baseRoute}/tag-chart`, months)
  }

  expenseChart(payload: { range: number[], monthIds: MonthDTO['id'][] }) {
    return this.http.post<Res<RawExpenseChartData[]>>(`${environment.apiUrl}/${this.baseRoute}/expense-chart`, payload)
  }
}
