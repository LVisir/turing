package com.rubrica.turing.service;

import com.rubrica.turing.dto.UtenteDTO;
import com.rubrica.turing.entity.Utente;

public interface UtenteService {

    UtenteDTO insertUser(Utente u);

    UtenteDTO getUserById(Long id);
}
