import { Component, OnInit } from '@angular/core';
import { PersonaTableDTO } from '../../interfaces/api.response';
import { PersonaService } from '../../services/persona.service';
import { PersonaComponent } from '../persona/persona.component';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../configs/routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [PersonaComponent],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.scss',
})
export class PersonaListComponent implements OnInit {
  personList!: Array<PersonaTableDTO>;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.personaService.getRubrica().subscribe({
      next: (res) => {
        if (res.success) {
          if (null !== res.body) {
            this.personList = res.body;
          } else {
            // TODO: da implementare cosa fare quando il success della risposta è a false
            console.log(res.error?.message);
          }
        }
      },
      error: (e) => {
        // TODO: da implementare cosa fare la chiamata non va in porto
        console.log(e);
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
    // TODO: aggiustare questa delete che non deleta
    this.personaService.deletePersona(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.personList = this.personList.filter((x) => x.id !== id);
        } else {
          // TODO: da implementare cosa fare quando il success della risposta è a false
          console.log('eliminazione non riuscita');
        }
      },
      error: (e) => {
        // TODO: da implementare cosa fare la chiamata non va in porto
        console.log(e);
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
