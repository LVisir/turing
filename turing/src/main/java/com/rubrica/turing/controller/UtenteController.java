package com.rubrica.turing.controller;

import com.rubrica.turing.dto.*;
import com.rubrica.turing.entity.Utente;
import com.rubrica.turing.security.JwtService;
import com.rubrica.turing.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/utente")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UtenteDTO>> saveUtente(@RequestBody Utente u) {
        ApiResponse<UtenteDTO> response = new ApiResponse<>();
        response.setBody(utenteService.insertUser(u));
        response.setError(null);
        response.setSuccess(true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        ApiResponse<LoginResponse> response = new ApiResponse<>();
        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.username(),
                                    request.password()
                            )
                    );

            CustomUserDetail user = (CustomUserDetail) authentication.getPrincipal();

            String token = jwtService.generateToken(user);

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setJwt(token);
            UtenteDTO loginUser = UtenteDTO.builder()
                    .id(user.getUser().getId())
                    .username(user.getUsername())
                    .build();
            loginResponse.setUtente(loginUser);

            response.setSuccess(true);
            response.setBody(loginResponse);
            response.setError(null);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setBody(null);
            response.setError(new ApiError(e.getMessage(), HttpStatus.BAD_REQUEST.value()));

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }


    }
}
