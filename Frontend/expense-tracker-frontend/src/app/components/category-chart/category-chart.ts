import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [],
  templateUrl: './category-chart.html',
  styleUrl: './category-chart.css',
})
export class CategoryChart implements AfterViewInit, OnChanges {
  @Input()
  expenses: Expense[] = [];

  chart!: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenses'] && this.chart) {
      this.chart.destroy();
      this.createChart();
    }
  }

  private createChart() {
    const categoryTotals: { [key: string]: number } = {};

    this.expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }

      categoryTotals[expense.category] += Number(expense.amount);
    });

    this.chart = new Chart('categoryChart', {
      type: 'pie',

      data: {
        labels: Object.keys(categoryTotals),

        datasets: [
          {
            data: Object.values(categoryTotals),

            backgroundColor: [
              '#3B82F6',
              '#22C55E',
              '#F97316',
              '#EAB308',
              '#EF4444',
              '#A855F7',
              '#06B6D4',
              '#64748B',
            ],
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            position: 'bottom',

            labels: {
              boxWidth: 14,
              padding: 15,
              color: '#ffffff',
            },
          },
        },
      },
    });
  }
}
