import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { APP_ROUTES } from '../configs/routes';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit {
  public constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate([APP_ROUTES.HOME], {
        replaceUrl: true,
      });
    }
  }
}
