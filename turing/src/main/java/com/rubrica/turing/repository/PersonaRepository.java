package com.rubrica.turing.repository;

import com.rubrica.turing.dto.PersonaTableDTO;
import com.rubrica.turing.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonaRepository extends JpaRepository<Persona, Long> {

    @Query("""
                select new com.rubrica.turing.dto.PersonaTableDTO(
                    p.id,
                    p.nome,
                    p.cognome,
                    p.telefono
                )
                from Persona p
                where p.utente.id = :ownerRubrica
            """)
    List<PersonaTableDTO> getRubrica(@Param("ownerRubrica") Long ownerRubrica);
}
