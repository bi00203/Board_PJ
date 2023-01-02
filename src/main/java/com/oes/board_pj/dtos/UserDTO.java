package com.oes.board_pj.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@ToString
public class UserDTO extends User {
    private String id;
    private String password;
    private String nick;
    private String email;
    private LocalDateTime joinDate;
    private String role;

    public UserDTO(String username,
                   String password,
                   String nick,
                   String email,
                   LocalDateTime joinDate,
                   String role,
                   Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.id = username;
        this.password = password;
        this.nick = nick;
        this.email = email;
        this.joinDate = joinDate;
        this.role = role;
    }
}
