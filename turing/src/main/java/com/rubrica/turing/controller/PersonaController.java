package com.rubrica.turing.controller;

import com.rubrica.turing.dto.ApiResponse;
import com.rubrica.turing.dto.CustomUserDetail;
import com.rubrica.turing.dto.PersonaRequestDTO;
import com.rubrica.turing.dto.PersonaTableDTO;
import com.rubrica.turing.entity.Persona;
import com.rubrica.turing.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rubrica")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PersonaTableDTO>>> getRubrica(Authentication authentication) {
        CustomUserDetail user = (CustomUserDetail) authentication.getPrincipal();
        ApiResponse<List<PersonaTableDTO>> response = new ApiResponse<>();
        response.setBody(personaService.getRubrica(user.getUser().getId()));
        response.setSuccess(true);
        response.setError(null);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<PersonaTableDTO>> addNumber(Authentication authentication, @RequestBody PersonaRequestDTO p) {
        CustomUserDetail user = (CustomUserDetail) authentication.getPrincipal();
        ApiResponse<PersonaTableDTO> response = new ApiResponse<>();
        response.setBody(personaService.addPerson(user.getUser().getId(), p));
        response.setError(null);
        response.setSuccess(true);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PersonaRequestDTO>> getPersonaById(Authentication authentication, @PathVariable("id") Long id) {
        CustomUserDetail user = (CustomUserDetail) authentication.getPrincipal();
        ApiResponse<PersonaRequestDTO> response = new ApiResponse<>();
        response.setBody(personaService.getPersonById(user.getUser().getId(), id));
        response.setError(null);
        response.setSuccess(true);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PersonaTableDTO>> updatePerson(Authentication authentication, @RequestBody Persona p) {
        CustomUserDetail user = (CustomUserDetail) authentication.getPrincipal();
        ApiResponse<PersonaTableDTO> response = new ApiResponse<>();
        response.setBody(personaService.updatePerson(user.getUser().getId(), p));
        response.setError(null);
        response.setSuccess(true);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Boolean>> deletePerson(@PathVariable("id") Long id) {
        ApiResponse<Boolean> response = new ApiResponse<>();
        response.setBody(personaService.deletePerson(id));
        response.setError(null);
        response.setSuccess(true);

        return ResponseEntity.ok(response);
    }

}
