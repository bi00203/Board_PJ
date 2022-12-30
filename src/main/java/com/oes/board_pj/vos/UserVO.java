package com.oes.board_pj.vos;

import lombok.*;

import java.util.Date;

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
    private Date joinDate;
    private String role;
}

