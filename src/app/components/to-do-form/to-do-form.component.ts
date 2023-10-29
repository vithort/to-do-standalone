import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ToDoSignalsService } from '../../services/to-do-signals.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-to-do-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './to-do-form.component.html',
  styleUrls: [],
})
export class TodoFormComponent {
  private toDosSignalsService = inject(ToDoSignalsService);

  allTodos = this.toDosSignalsService.toDosState();

  todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  private dialogRefService = inject(MatDialogRef<HeaderComponent>);

  handleCreateNewTodo(): void {
    if (this.todosForm.value && this.todosForm.valid) {
      const description = String(this.todosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const title = String(this.todosForm.controls['title'].value);
      const done = false;

      this.toDosSignalsService.updateTodos({ id, title, description, done });
      this.dialogRefService.close();
    }
  }

  handleCloseModal(): void {
    this.dialogRefService.close();
  }
}
