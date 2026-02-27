import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../services/persona.service';
import { Persona, PersonaRequestDTO } from '../interfaces/api.response';
import { APP_ROUTES } from '../configs/routes';

@Component({
  selector: 'app-form-persona',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-persona.component.html',
  styleUrl: './form-persona.component.scss',
})
export class FormPersonaComponent implements OnInit {
  isEditMode = false;
  personId?: number;

  titleForm!: string;

  constructor(
    private route: ActivatedRoute,
    private personaService: PersonaService,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.titleForm = 'Modifica Contatto';
      this.isEditMode = true;
      this.personId = Number(id);
      this.personaService.getPersonaById(this.personId).subscribe({
        next: (res) => {
          if (res.success) {
            if (null !== res.body) {
              this.contactForm.patchValue(res.body);
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
    } else {
      this.titleForm = 'Nuovo Contatto';
    }
  }

  contactForm = new FormGroup({
    nome: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/\S+/),
      ],
    }),

    cognome: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/\S+/),
      ],
    }),

    indirizzo: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern(/\S+/),
      ],
    }),

    telefono: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\+?[0-9 ]{6,20}$/),
      ],
    }),

    eta: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(120)],
    }),
  });

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.invalid) return;
    const p: PersonaRequestDTO = this.contactForm.getRawValue();

    if (this.isEditMode && this.personId !== undefined) {
      const p2: Persona = { ...p, id: this.personId };
      //this.updateContact();
      console.log('update');
      this.personaService.updatePersona(p2).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate([APP_ROUTES.HOME]);
          } else {
            console.log(res.error?.message);
          }
        },
        error: (e) => {
          // TODO: da implementare cosa fare la chiamata non va in porto
          console.log(e);
        },
      });
    } else {
      // this.createContact();
      console.log('create');

      this.personaService.addPersona(p).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate([APP_ROUTES.HOME]);
          } else {
            console.log(res.error?.message);
          }
        },
        error: (e) => {
          // TODO: da implementare cosa fare la chiamata non va in porto
          console.log(e);
        },
      });
    }
  }
}
