import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { Expense } from '../../models/expense';
import { Header } from '../header/header';
import { AddExpense } from '../add-expense/add-expense';
import { MonthlyChart } from '../monthly-chart/monthly-chart';
import { CategoryChart } from '../category-chart/category-chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, AddExpense, MonthlyChart, CategoryChart],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private expenseService = inject(ExpenseService);

  expenses: Expense[] = [];

  filteredExpenses: Expense[] = [];

  showAddExpenseModal = false;

  selectedExpense: Expense | null = null;

  searchText = '';

  selectedCategory = 'ALL';

  sortOption = 'NEWEST';

  selectedMonth = 'ALL';

  deleteExpenseId: number | null = null;

  showDeleteModal = false;

  confirmDelete(id: number): void {
    this.deleteExpenseId = id;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.deleteExpenseId = null;
  }

  deleteExpense(): void {
    if (this.deleteExpenseId === null) return;

    this.expenseService.deleteExpense(this.deleteExpenseId).subscribe(() => {
      this.loadExpenses();

      this.showDeleteModal = false;

      this.deleteExpenseId = null;
    });
  }

  ngOnInit(): void {
    this.loadExpenses();
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

      let matchesMonth = true;

      if (this.selectedMonth !== 'ALL') {
        const expenseMonth = expense.expenseDate.substring(0, 7); // yyyy-MM
        matchesMonth = expenseMonth === this.selectedMonth;
      }

      return matchesSearch && matchesCategory && matchesMonth;
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

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSortChange(sort: string): void {
    this.sortOption = sort;
    this.applyFilters();
  }

  onMonthChange(month: string): void {
    this.selectedMonth = month;
    this.applyFilters();
  }

  openAddExpenseModal(): void {
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

  editExpense(expense: Expense): void {
    this.selectedExpense = expense;
    this.showAddExpenseModal = true;
  }

  getTotalExpenses(): number {
    return this.filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
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
    return this.filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }
}
