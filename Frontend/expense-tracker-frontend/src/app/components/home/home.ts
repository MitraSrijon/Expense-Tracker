import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { Expense } from '../../models/expense';
import { Header } from '../header/header';

@Component({
  selector: 'app-home',
  imports: [Header],
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

  deleteExpense(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this expense?');

    if (!confirmed) {
      return;
    }

    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        this.loadExpenses();
      },

      error: (err) => {
        console.error('Delete failed', err);
      },
    });
  }

  getTotalExpenses(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getTotalTransactions(): number {
    return this.expenses.length;
  }

  getCurrentMonthExpenses(): number {
    const currentDate = new Date();

    return this.expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.expenseDate);

        return (
          expenseDate.getMonth() === currentDate.getMonth() &&
          expenseDate.getFullYear() === currentDate.getFullYear()
        );
      })
      .reduce((total, expense) => total + expense.amount, 0);
  }

  ngOnInit(): void {
    this.loadExpenses();
  }
}
