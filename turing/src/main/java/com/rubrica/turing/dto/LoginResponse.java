package com.rubrica.turing.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String jwt;

    private UtenteDTO utente;
}
