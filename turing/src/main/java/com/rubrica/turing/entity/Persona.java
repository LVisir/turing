package com.rubrica.turing.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "persona")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Persona {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @Column(name = "nome")
    @NotNull
    @Size(min = 3, max = 50, message = "Il nome deve avere lunghezza compresa tra 3 e 50")
    private String nome;

    @Column(name = "cognome")
    @NotNull
    @Size(min = 3, max = 50, message = "Il cognome deve avere lunghezza compresa tra 3 e 50")
    private String cognome;

    @Column(name = "indirizzo")
    @NotNull
    @Size(min = 5, max = 50, message = "L'indirizzo deve avere lunghezza compresa tra 5 e 50")
    private String indirizzo;

    @Column(name = "telefono")
    @NotNull
    @Size(min = 8, max = 50, message = "Il telefono deve avere lunghezza compresa tra 8 e 20")
    private String telefono;

    @Column(name = "eta")
    @NotNull
    private int eta;
}
