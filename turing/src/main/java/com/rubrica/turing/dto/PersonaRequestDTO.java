package com.rubrica.turing.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonaRequestDTO {

    private String nome;

    private String cognome;

    private String indirizzo;

    private String telefono;

    private int eta;
}
