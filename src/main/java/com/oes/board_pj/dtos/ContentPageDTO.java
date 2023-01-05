package com.oes.board_pj.dtos;

import com.oes.board_pj.vos.ContentVO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Data
@ToString
@Getter
@Setter
public class ContentPageDTO {
    private int allContentCnt;  // 전체 글 개수 -> 가져와야함
    private int allPageCnt;     // 전체 페이지 개수 -> 여기서 처리
    private int showContentCnt; // 한 페이지에 표시할 글 개수 -> 여기서 처리
    private int showPageCnt;    // 한 페이지에 표시할 페이지 목록 개수 -> 여기서 처리
    private int nowPageNum;     // 현재 있는 페이지 넘버 -> 가져와야함
    private int startPageNum;   // 시작 페이지 넘버(1,6,11) -> 여기서 처리
    private int endPageNum;     // 끝 페이지 넘버 -> 여기서 처리

    private boolean prevBtn;    // 이전 버튼이 있는지 여부
    private boolean nextBtn;    // 다음 버튼이 있는지 여부

    List<ContentVO> contents;   // 해당 페이지에 표시할 글 목록 -> 가져와야함

    public ContentPageDTO(int allContentCnt, int nowPageNum, List<ContentVO> contents) {
        this.allContentCnt = allContentCnt;
        this.showContentCnt = contents.size();
        this.nowPageNum = nowPageNum;
        this.prevBtn = true;
        this.nextBtn = true;
        this.contents = contents;

        this.allPageCnt = allContentCnt / 10 + 1; // 필요한 페이지 수

        // 페이지 버튼 목록의 첫번째와 마지막 번호
        if(nowPageNum % 5 == 0){
            this.startPageNum = nowPageNum - 4;
            this.endPageNum = nowPageNum;
        }
        else{
            this.startPageNum = nowPageNum - (nowPageNum % 5) + 1;

            // 전체 페이지 개수보다 크다면
            if(this.allPageCnt < this.startPageNum + 4){
                this.endPageNum = this.allPageCnt;
            }
            else {
                this.endPageNum = this.startPageNum + 4;
            }
        }

        // 보여줄 목록개수 -> 끝 페이지 넘버 - 시작 페이지 넘버 + 1
        this.showPageCnt = this.endPageNum - this.startPageNum + 1;

        // 페이지목록 첫번째 넘버가 1이라면 이전 버튼 X
        if(this.startPageNum == 1){
            this.prevBtn = false;
        }

        // 페이지목록 마지막 숫자가 전체 페이지 개수랑 같다면 다음 버튼 X
        if(this.endPageNum == this.allPageCnt){
            this.nextBtn = false;
        }

    }

}
