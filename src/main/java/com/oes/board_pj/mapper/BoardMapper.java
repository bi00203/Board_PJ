package com.oes.board_pj.mapper;

import com.oes.board_pj.vos.ContentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface BoardMapper {
    // 글쓰기
    boolean write(String[] writeInfo);
    // 글 목록 가져오기
    List<ContentVO> get_all_contents();

    // 글 정보 가져오기
    ContentVO get_content(int no);

    // 글 삭제
    boolean content_delete(int no);

    // 글 수정
    boolean modify_content(int no, String title,String mainText);
}
