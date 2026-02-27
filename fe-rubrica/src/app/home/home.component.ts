import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../configs/routes';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate([APP_ROUTES.LOGIN]);
    }
  }
}
