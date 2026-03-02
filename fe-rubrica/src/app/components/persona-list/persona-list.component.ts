import { Component, OnInit } from '@angular/core';
import { PersonaTableDTO } from '../../interfaces/api.response';
import { PersonaService } from '../../services/persona.service';
import { PersonaComponent } from '../persona/persona.component';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../configs/routes';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [PersonaComponent, SpinnerComponent],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.scss',
})
export class PersonaListComponent implements OnInit {
  personList!: Array<PersonaTableDTO>;

  loading: boolean = true;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.personaService.getRubrica().subscribe({
      next: (res) => {
        if (res.success) {
          if (null !== res.body) {
            this.personList = res.body;
            this.loading = false;
          } else {
            // TODO: da implementare cosa fare quando il success della risposta è a false
            console.log(res.error?.message);
            this.loading = false;
          }
        }
      },
      error: (e) => {
        // TODO: da implementare cosa fare la chiamata non va in porto
        console.log(e);
        this.loading = false;
      },
    });
  }

  moveToFormPersona(idPersona: number) {
    console.log('update');

    this.router.navigate([APP_ROUTES.FORM, idPersona], {
      relativeTo: this.route,
    });
  }

  onDelete(id: number) {
    this.loading = true;
    // TODO: aggiustare questa delete che non deleta
    this.personaService.deletePersona(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.personList = this.personList.filter((x) => x.id !== id);
          this.loading = false;
        } else {
          // TODO: da implementare cosa fare quando il success della risposta è a false
          console.log('eliminazione non riuscita');
          this.loading = false;
        }
      },
      error: (e) => {
        // TODO: da implementare cosa fare la chiamata non va in porto
        console.log(e);
        this.loading = false;
      },
    });
  }

  moveToSavePersona() {
    console.log('save');

    this.router.navigate([APP_ROUTES.FORM], {
      relativeTo: this.route,
    });
  }
}
