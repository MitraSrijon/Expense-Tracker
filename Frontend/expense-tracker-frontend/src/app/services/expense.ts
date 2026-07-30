import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Expense } from '../models/expense';

@Service()
export class ExpenseService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/expenses';

  getAllExpenses() {
    return this.http.get<Expense[]>(this.apiUrl);
  }
}
