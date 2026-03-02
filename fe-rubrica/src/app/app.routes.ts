import { Routes } from '@angular/router';
import { APP_ROUTES } from './configs/routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => {
      const m = await import('./auth-layout/auth-layout.component');
      return m.AuthLayoutComponent;
    },
    children: [
      {
        path: APP_ROUTES.LOGIN,
        loadComponent: async () => {
          const m = await import('./login/login.component');
          return m.LoginComponent;
        },
      },
      {
        path: APP_ROUTES.REGISTRATION,
        loadComponent: async () => {
          const m = await import('./registration/registration.component');
          return m.RegistrationComponent;
        },
      },
    ],
  },
  {
    path: APP_ROUTES.HOME,
    loadComponent: async () => {
      const m = await import('./home/home.component');
      return m.HomeComponent;
    },
    children: [
      {
        path: '',
        loadComponent: async () => {
          const m =
            await import('./components/persona-list/persona-list.component');
          return m.PersonaListComponent;
        },
      },
      {
        path: APP_ROUTES.FORM,
        loadComponent: async () => {
          const m = await import('./form-persona/form-persona.component');
          return m.FormPersonaComponent;
        },
      },
      {
        path: APP_ROUTES.MODIFICA,
        loadComponent: async () => {
          const m = await import('./form-persona/form-persona.component');
          return m.FormPersonaComponent;
        },
      },
    ],
  },
];
