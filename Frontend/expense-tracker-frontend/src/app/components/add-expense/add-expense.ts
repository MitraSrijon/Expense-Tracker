import { Component, effect, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense-service';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {
  expenseAdded = output<void>();

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);

  isEditMode = false;

  editingExpenseId: number | null = null;

  @Input()
  expense: Expense | null = null;

  constructor() {
    effect(() => {
      if (this.expense) {
        this.isEditMode = true;
        this.editingExpenseId = this.expense.id;

        this.expenseForm.patchValue({
          title: this.expense.title,
          amount: this.expense.amount,
          category: this.expense.category,
          expenseDate: this.expense.expenseDate,
          paymentMethod: this.expense.paymentMethod,
          description: this.expense.description,
        });
      }
    });
  }

  expenseForm = this.fb.group({
    title: ['', Validators.required],
    amount: [0, Validators.required],
    category: ['', Validators.required],
    expenseDate: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    description: [''],
  });

  saveExpense() {
    if (this.expenseForm.invalid) return;

    const expenseData = this.expenseForm.value as Expense;

    if (this.isEditMode && this.editingExpenseId !== null) {
      this.expenseService.updateExpense(this.editingExpenseId, expenseData).subscribe({
        next: () => {
          this.expenseAdded.emit();

          this.expenseForm.reset({
            title: '',
            amount: 0,
            category: '',
            expenseDate: '',
            paymentMethod: '',
            description: '',
          });

          this.isEditMode = false;
          this.editingExpenseId = null;
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.expenseService.addExpense(expenseData).subscribe({
        next: () => {
          this.expenseAdded.emit();

          this.expenseForm.reset({
            title: '',
            amount: 0,
            category: '',
            expenseDate: '',
            paymentMethod: '',
            description: '',
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
