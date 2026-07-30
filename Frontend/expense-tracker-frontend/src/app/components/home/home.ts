import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense';
import { Expense } from '../../models/expense';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private expenseService = inject(ExpenseService);

  expenses: Expense[] = [];

  ngOnInit(): void {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        console.log('SUCCESS:', data);
        this.expenses = data;
      },
      error: (err) => {
        console.error('ERROR:', err);
      },
    });
  }
}
