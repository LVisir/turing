import { Component } from '@angular/core';
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { API_ENDPOINTS } from '../configs/api-endpoints';
import { UserService } from '../services/user.service';
import { APP_ROUTES } from '../configs/routes';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [GenericDialogComponent, FormsModule, SpinnerComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  host: { class: 'contents' },
})
export class RegistrationComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  dialogMessage: string = 'Errore server';

  loading: boolean = false;

  errorPresent: boolean = false;

  dialogTitle: string = 'Errore';

  username!: string;
  password!: string;

  showDialog: boolean = false;

  confirmShowDialog() {
    this.showDialog = true;
  }

  undoShowDialog() {
    this.showDialog = false;
  }

  confirm() {
    if (this.errorPresent) {
      this.showDialog = false;
    } else {
      this.router.navigate([APP_ROUTES.LOGIN]);
    }
  }

  goToLoginPage() {
    this.router.navigate([APP_ROUTES.LOGIN], { relativeTo: this.route });
  }

  registration() {
    this.loading = true;
    this.userService
      .register({ id: null, username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.loading = false;
            this.errorPresent = false;
            this.dialogTitle = 'Success';
            this.dialogMessage = 'Utente creato con successo';
            this.confirmShowDialog();
          } else if (null != res.error) {
            this.loading = false;
            this.dialogMessage = res.error.message;
            this.errorPresent = true;
            this.dialogTitle = 'Errore';
            this.confirmShowDialog();
          }
        },
        error: (_) => {
          this.loading = false;
          this.dialogMessage = 'Server Error';
          this.errorPresent = true;
          this.dialogTitle = 'Errore';
          this.confirmShowDialog();
        },
      });
  }
}
