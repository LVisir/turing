package com.rubrica.turing.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "utente")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Utente {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    @NotEmpty
    @Size(min = 3, max = 50, message = "L'username può contenere dai 3 ai 50 caratteri")
    private String username;

    @Column(name = "password")
    @NotEmpty
    @Size(min = 4, max = 50, message = "La password può contenere dai 3 ai 50 caratteri")
    private String password;
}
