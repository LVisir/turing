import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [],
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.scss',
})
export class GenericDialogComponent {
  @Input()
  showConfirm: boolean = false;

  @Input()
  actionTitle!: string;

  @Input()
  questionDialog!: string;

  @Input()
  dialogTitle!: string;

  @Output()
  confirmShowDialog = new EventEmitter<void>();

  @Output()
  undoShowDialog = new EventEmitter<void>();

  @Output()
  execute = new EventEmitter<void>();

  openConfirm() {
    this.confirmShowDialog.emit();
  }

  closeConfirm() {
    this.undoShowDialog.emit();
  }

  confirmDelete() {
    this.execute.emit();
    this.closeConfirm();
  }
}
