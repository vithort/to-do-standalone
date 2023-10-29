import { Component, OnInit, computed, inject, effect } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { ToDoSignalsService } from 'src/app/services/to-do-signals.service';
import { ToDoKeyLocalStorage } from 'src/app/models/enum/to-do-key-local-storage';
import { ToDo } from 'src/app/models/model/to-do.model';

@Component({
  selector: 'app-to-do-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './to-do-card.component.html',
  styleUrls: [],
})
export class ToDoCardComponent implements OnInit {
  private toDosSignalsService = inject(ToDoSignalsService);
  private toDosSignal = this.toDosSignalsService.toDosState;

  todosList = computed(() => this.toDosSignal());

  constructor() {
    effect(() => {
      console.log(
        'SIGNAL FOI ATUALIZADO',
        this.toDosSignalsService.toDosState()
      );
    });
  }

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(
      ToDoKeyLocalStorage.TODO_LIST
    ) as string;

    todosDatas && this.toDosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.toDosSignalsService.saveToDosLocalStorage();
  }

  handleDoneTodo(toDoId: number): void {
    if (toDoId) {
      this.toDosSignal.mutate((toDos: ToDo[]) => {
        const todoSelected = toDos.find(
          (toDo: ToDo) => toDo?.id === toDoId
        ) as ToDo;
        todoSelected && (todoSelected.done = true);
        this.saveTodosInLocalStorage();
      });
    }
  }

  handleDeleteTodo(toDo: ToDo): void {
    if (toDo) {
      const index = this.todosList().indexOf(toDo);

      if (index !== -1) {
        this.toDosSignal.mutate((toDos: ToDo[]) => toDos.splice(index, 1));
        this.saveTodosInLocalStorage();
      }
    }
  }
}
