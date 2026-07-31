import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/expenses';

  getAllExpenses() {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  addExpense(expense: Expense) {
    return this.http.post<Expense>(this.apiUrl, expense);
  }
}
