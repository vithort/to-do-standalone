import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TodoFormComponent } from '../to-do-form/to-do-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  private dialogService = inject(MatDialog);

  handleOpenModal(): void {
    this.dialogService.open(TodoFormComponent, {
      width: '50vw',
      maxHeight: '80vh',
    });
  }
}
