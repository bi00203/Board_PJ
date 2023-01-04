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
public class ContentVO {
    int no;
    String title;
    String mainText;
    String writer;
    int view;
    LocalDateTime writeDate;
    LocalDateTime modifyDate;
    String id;
    int hasReply;
}
