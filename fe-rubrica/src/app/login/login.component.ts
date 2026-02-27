import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { APP_ROUTES } from '../configs/routes';
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, GenericDialogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  errorMessage: string = 'Errore server';

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate([APP_ROUTES.HOME], {
        replaceUrl: true,
      });
    }
  }

  username!: string;
  password!: string;

  checkCredentials() {
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
          }
        },
        error: (e) => {
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
}
