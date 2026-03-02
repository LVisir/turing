import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { APP_ROUTES } from '../configs/routes';
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, GenericDialogComponent, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: { class: 'contents' },
})
export class LoginComponent {
  public constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  errorMessage: string = 'Errore server';

  username!: string;
  password!: string;

  loading: boolean = false;

  checkCredentials() {
    this.loading = true;

    this.userService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          if (res.success) {
            if (null !== res.body) {
              localStorage.setItem('token', res.body.jwt);

              this.router.navigate([APP_ROUTES.HOME], {
                replaceUrl: true,
              });
            }
          } else {
            console.log(res.error?.message);
            this.loading = false;
          }
        },
        error: (e) => {
          this.loading = false;
          this.errorMessage = e.error.error.message;
          this.confirmShowDialog();
        },
      });
  }

  showDialog: boolean = false;

  confirmShowDialog() {
    this.showDialog = true;
  }

  undoShowDialog() {
    this.showDialog = false;
  }

  confirm() {
    this.showDialog = false;
  }

  goToRegistrationPage() {
    this.router.navigate([APP_ROUTES.REGISTRATION], {
      relativeTo: this.route,
    });
  }
}
