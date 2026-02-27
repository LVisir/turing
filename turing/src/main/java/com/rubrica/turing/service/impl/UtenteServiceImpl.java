package com.rubrica.turing.service.impl;

import com.rubrica.turing.dto.CustomUserDetail;
import com.rubrica.turing.dto.UtenteDTO;
import com.rubrica.turing.entity.Utente;
import com.rubrica.turing.repository.UtenteRepository;
import com.rubrica.turing.service.UtenteService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UtenteServiceImpl implements UtenteService, UserDetailsService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Override
    public UtenteDTO insertUser(Utente u) {
        u.setId(null);
        Utente userSaved = utenteRepository.save(u);

        return UtenteDTO.builder()
                .id(userSaved.getId())
                .username(userSaved.getUsername())
                .build();
    }

    @Override
    public UtenteDTO getUserById(Long id) {
        Optional<Utente> u = Optional.of(utenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente con id immesso non presente")));

        return UtenteDTO.builder()
                .id(u.get().getId())
                .username(u.get().getUsername())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Utente> u = Optional.of(utenteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Username non presente")));

        return new CustomUserDetail(u.get());
    }
}
