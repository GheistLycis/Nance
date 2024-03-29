import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MonthlyExpenseDTO from '@DTOs/monthlyExpense';
import { environment } from 'src/environments/environment';
import { Response as Res } from '@interfaces/Response';
import MonthlyExpenseForm from '../../classes/MonthlyExpenseForm';
import { queryMaker } from '../queryMaker';
import MonthDTO from '../../DTOs/month';

@Injectable({
  providedIn: 'root'
})
export class MonthlyExpenseService {
  baseRoute = 'monthly-expenses'

  constructor(private http: HttpClient) {}

  list(query: { month?: MonthDTO['id'] }) {
    return this.http.get<Res<MonthlyExpenseDTO[]>>(`${environment.apiUrl}/${this.baseRoute}?${queryMaker(query)}`)
  }
  
  upNext() {
    return this.http.get<Res<MonthlyExpenseDTO[]>>(`${environment.apiUrl}/${this.baseRoute}/up-next`)
  }

  get(id: MonthlyExpenseDTO['id']) {
    return this.http.get<Res<MonthlyExpenseDTO>>(`${environment.apiUrl}/${this.baseRoute}/${id}`)
  }

  post(payload: MonthlyExpenseForm) {
    return this.http.post<Res<MonthlyExpenseDTO>>(`${environment.apiUrl}/${this.baseRoute}`, payload)
  }

  put(id: number, payload: MonthlyExpenseForm) {
    return this.http.put<Res<MonthlyExpenseDTO>>(`${environment.apiUrl}/${this.baseRoute}/${id}`, payload)
  }

  delete(id: number) {
    return this.http.delete<Res<MonthlyExpenseDTO>>(`${environment.apiUrl}/${this.baseRoute}/${id}`)
  }
}
