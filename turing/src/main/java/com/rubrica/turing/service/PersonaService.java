package com.rubrica.turing.service;

import com.rubrica.turing.dto.PersonaRequestDTO;
import com.rubrica.turing.dto.PersonaTableDTO;
import com.rubrica.turing.entity.Persona;

import java.util.List;

public interface PersonaService {

    List<PersonaTableDTO> getRubrica(Long ownerRubrica);

    PersonaTableDTO addPerson(Long userId, PersonaRequestDTO p);

    boolean deletePerson(Long id);

    PersonaTableDTO updatePerson(Long owner, Persona p);

    PersonaRequestDTO getPersonById(Long owner, Long idPersona);
}
