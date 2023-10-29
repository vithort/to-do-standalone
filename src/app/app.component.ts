import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ToDoCardComponent } from './components/to-do-card/to-do-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ToDoCardComponent],
  template: ` <app-header> </app-header> <app-to-do-card></app-to-do-card>`,
  styleUrls: [],
})
export class AppComponent {
  title = 'todo-list-16';
}
