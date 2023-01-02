package com.oes.board_pj.vos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

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
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss")
    private LocalDateTime joinDate;
    private String role;
}

