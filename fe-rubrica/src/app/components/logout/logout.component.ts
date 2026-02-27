import { Component } from '@angular/core';
import { APP_ROUTES } from '../../configs/routes';
import { Router } from '@angular/router';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [GenericDialogComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(private router: Router) {}

  showDialog: boolean = false;

  confirmShowDialog() {
    this.showDialog = true;
  }

  undoShowDialog() {
    this.showDialog = false;
  }

  confirm() {
    localStorage.removeItem('token');
    this.router.navigate([APP_ROUTES.LOGIN], {
      replaceUrl: true,
    });
  }
}
