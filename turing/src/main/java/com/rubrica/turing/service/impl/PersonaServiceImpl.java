package com.rubrica.turing.service.impl;

import com.rubrica.turing.dto.PersonaRequestDTO;
import com.rubrica.turing.dto.PersonaTableDTO;
import com.rubrica.turing.entity.Persona;
import com.rubrica.turing.entity.Utente;
import com.rubrica.turing.repository.PersonaRepository;
import com.rubrica.turing.service.PersonaService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class PersonaServiceImpl implements PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public List<PersonaTableDTO> getRubrica(Long ownerRubrica) {
        return personaRepository.getRubrica(ownerRubrica);
    }

    @Override
    public PersonaTableDTO addPerson(Long userId, PersonaRequestDTO p) {
        Utente u = new Utente();
        u.setId(userId);
        Persona newP = Persona.builder()
                .utente(u)
                .nome(p.getNome())
                .cognome(p.getCognome())
                .indirizzo(p.getIndirizzo())
                .telefono(p.getTelefono())
                .eta(p.getEta())
                .build();

        personaRepository.save(newP);

        PersonaTableDTO response = PersonaTableDTO.builder()
                .nome(newP.getNome())
                .cognome(newP.getCognome())
                .telefono(newP.getTelefono())
                .build();

        return response;
    }

    @Override
    public boolean deletePerson(Long id) {
        Optional<Persona> p = personaRepository.findById(id);
        if(p.isEmpty()) {
            throw new RuntimeException("Persona non presente nel db");
        }

        personaRepository.delete(p.get());

        return true;
    }

    @Override
    public PersonaTableDTO updatePerson(Long owner, Persona p) {

        log.info("*** Controllo che la persona di cui sta facendo l'update è appartenente alla sua rubrica");

        List<PersonaTableDTO> hisRubrica = personaRepository.getRubrica(owner);
        boolean present = false;
        for(PersonaTableDTO e : hisRubrica) {
            if(e.getId().equals(p.getId())) {
                present = true;
                break;
            }
        }

        if(!present) {
            throw new RuntimeException("Persona non appartiene alla tua rubrica");
        }

        Persona p2 = personaRepository.findById(p.getId())
                .orElseThrow(() -> new RuntimeException("Persona non presente"));

        p2.setNome(p.getNome());
        p2.setCognome(p.getCognome());
        p2.setTelefono(p.getTelefono());
        p2.setIndirizzo(p.getIndirizzo());
        p2.setEta(p.getEta());

        personaRepository.save(p2);

        return PersonaTableDTO.builder()
                .nome(p2.getNome())
                .cognome(p2.getCognome())
                .telefono(p2.getTelefono())
                .build();

    }

    @Override
    public PersonaRequestDTO getPersonById(Long owner, Long idPersona) {
        Optional<Persona> p = Optional.of(personaRepository.findById(idPersona)
                .orElseThrow(() -> new RuntimeException("Persona non esistente")));

        log.info("*** Controllo che la persona sia appartenente alla sua rubrica");
        List<PersonaTableDTO> hisRubrica = personaRepository.getRubrica(owner);
        boolean present = false;
        for(PersonaTableDTO e : hisRubrica) {
            if(e.getId().equals(idPersona)) {
                present = true;
                break;
            }
        }

        if(!present) {
            throw new RuntimeException("Persona non appartiene alla tua rubrica");
        }

        PersonaRequestDTO response = PersonaRequestDTO.builder()
                .nome(p.get().getNome())
                .eta(p.get().getEta())
                .cognome(p.get().getCognome())
                .indirizzo(p.get().getIndirizzo())
                .telefono(p.get().getTelefono())
                .build();

        return response;

    }
}
