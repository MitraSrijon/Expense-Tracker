import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  addExpenseClicked = output<void>();

  searchChanged = output<string>();

  categoryChanged = output<string>();

  sortChanged = output<string>();

  searchText = '';
}
