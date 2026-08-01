import { Chart } from 'chart.js/auto';
import { Expense } from '../../models/expense';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-monthly-chart',
  standalone: true,
  imports: [],
  templateUrl: './monthly-chart.html',
  styleUrl: './monthly-chart.css',
})
export class MonthlyChart implements AfterViewInit, OnChanges {
  @Input()
  expenses: Expense[] = [];

  chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses'] && this.chart) {
      this.chart.destroy();
      this.createChart();
    }
  }

  private createChart() {
    const monthlyTotals = new Array(12).fill(0);

    this.expenses.forEach((expense) => {
      const month = new Date(expense.expenseDate).getMonth();

      monthlyTotals[month] += Number(expense.amount);
    });

    this.chart = new Chart('monthlyChart', {
      type: 'bar',

      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],

        datasets: [
          {
            label: 'Expenses',

            data: monthlyTotals,
          },
        ],
      },
    });
  }
}
