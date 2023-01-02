package com.oes.board_pj.vos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy.MM.dd HH:mm:ss")
    LocalDateTime writeDate;
//    @DateTimeFormat(pattern = "yyyy.MM.dd")
    LocalDateTime modifyDate;
    String id;
}
