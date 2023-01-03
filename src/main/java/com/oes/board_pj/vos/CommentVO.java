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
public class CommentVO {
    int no;
    int parentNo;
    String commentText;
    String writer;
    LocalDateTime writeDate;
    LocalDateTime modifyDate;
    String id;
    int contentNo;
}
