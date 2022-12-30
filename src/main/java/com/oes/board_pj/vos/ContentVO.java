package com.oes.board_pj.vos;

import lombok.*;

import java.util.Date;

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
    Date writeDate;
    Date modifyDate;
    String id;
}
