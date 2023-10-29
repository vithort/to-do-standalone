import { Injectable, signal } from '@angular/core';

import { ToDo } from '../models/model/to-do.model';
import { ToDoKeyLocalStorage } from '../models/enum/to-do-key-local-storage';

@Injectable({
  providedIn: 'root',
})
export class ToDoSignalsService {
  toDosState = signal<Array<ToDo>>([]);

  updateTodos({ id, title, description, done }: ToDo): void {
    if ((title && id && description !== null) || undefined) {
      this.toDosState.mutate((toDos) => {
        if (toDos !== null) {
          toDos.push(new ToDo(id, title, description, done));
        }
      });

      this.saveToDosLocalStorage();
    }
  }

  saveToDosLocalStorage(): void {
    const toDos = JSON.stringify(this.toDosState());

    toDos && localStorage.setItem(ToDoKeyLocalStorage.TODO_LIST, toDos);
  }
}
