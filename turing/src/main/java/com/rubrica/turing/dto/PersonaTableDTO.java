package com.rubrica.turing.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonaTableDTO {

    private Long id;

    private String nome;

    private String cognome;

    private String telefono;
}
