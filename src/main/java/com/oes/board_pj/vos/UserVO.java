package com.oes.board_pj.vos;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserVO {
    private String id;
    private String password;
    private String nick;
    private String email;
    private LocalDateTime joinDate;
    private String role;
}

