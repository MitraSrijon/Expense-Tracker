import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {
  expenseAdded = output<void>();

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);

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

    this.expenseService.addExpense(this.expenseForm.value as any).subscribe({
      next: (expense) => {
        console.log('Saved:', expense);

        this.expenseAdded.emit();

        this.expenseForm.reset();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
