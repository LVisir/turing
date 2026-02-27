import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonaTableDTO } from '../../interfaces/api.response';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [GenericDialogComponent],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.scss',
  host: { class: 'contents' },
})
export class PersonaComponent {
  @Input()
  persona!: PersonaTableDTO;

  @Output()
  modifica = new EventEmitter<void>();

  @Output()
  elimina = new EventEmitter<void>();

  onDelete() {
    this.elimina.emit();
  }

  onModifica() {
    this.modifica.emit();
  }

  showDialog: boolean = false;

  confirmShowDialog() {
    this.showDialog = true;
  }

  undoShowDialog() {
    this.showDialog = false;
  }

  confirm() {
    this.elimina.emit();
  }
}
