import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { Expense } from '../../models/expense';
import { AddExpense } from '../add-expense/add-expense';

@Component({
  selector: 'app-home',
  imports: [AddExpense],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private expenseService = inject(ExpenseService);

  expenses: Expense[] = [];

  loadExpenses() {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.loadExpenses();
  }
}
