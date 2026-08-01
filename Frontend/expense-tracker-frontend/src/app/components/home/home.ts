import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { Expense } from '../../models/expense';
import { Header } from '../header/header';
import { AddExpense } from '../add-expense/add-expense';
import { MonthlyChart } from '../monthly-chart/monthly-chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, AddExpense, MonthlyChart],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private expenseService = inject(ExpenseService);

  expenses: Expense[] = [];

  showAddExpenseModal = false;

  selectedExpense: Expense | null = null;

  filteredExpenses: Expense[] = [];

  searchText = '';
  selectedCategory = 'ALL';

  sortOption = 'NEWEST';

  onSortChange(sort: string): void {
    this.sortOption = sort;
    this.applyFilters();
  }

  loadExpenses() {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilters(): void {
    this.filteredExpenses = this.expenses.filter((expense) => {
      const matchesSearch = expense.title.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'ALL' || expense.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (this.sortOption) {
      case 'HIGH':
        this.filteredExpenses.sort((a, b) => b.amount - a.amount);
        break;

      case 'LOW':
        this.filteredExpenses.sort((a, b) => a.amount - b.amount);
        break;

      case 'NEWEST':
        this.filteredExpenses.sort(
          (a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime(),
        );
        break;

      case 'OLDEST':
        this.filteredExpenses.sort(
          (a, b) => new Date(a.expenseDate).getTime() - new Date(b.expenseDate).getTime(),
        );
        break;
    }
  }

  onSearch(search: string): void {
    this.searchText = search;
    this.applyFilters();
  }

  deleteExpense(id: number) {
    const confirmed = confirm('Are you sure you want to delete this expense?');

    if (!confirmed) {
      return;
    }

    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }

  editExpense(expense: Expense): void {
    this.selectedExpense = expense;

    this.showAddExpenseModal = true;
  }

  getTotalExpenses(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getTotalTransactions(): number {
    return this.filteredExpenses.length;
  }

  getHighestExpense(): number {
    if (this.filteredExpenses.length === 0) {
      return 0;
    }

    return Math.max(...this.filteredExpenses.map((expense) => expense.amount));
  }

  getThisMonthExpenses(): number {
    const now = new Date();

    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    this.filteredExpenses.forEach((expense) => {
      const [year, month] = expense.expenseDate.split('-').map(Number);
    });

    return this.filteredExpenses
      .filter((expense) => {
        const [year, month] = expense.expenseDate.split('-').map(Number);

        return month === currentMonth && year === currentYear;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
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

  openAddExpenseModal(): void {
    console.log('Add Expense clicked!');
    this.showAddExpenseModal = true;
  }

  closeAddExpenseModal(): void {
    this.showAddExpenseModal = false;
    this.selectedExpense = null;
  }

  onExpenseSaved(): void {
    this.loadExpenses();

    this.selectedExpense = null;

    this.closeAddExpenseModal();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
}
