package com.oes.board_pj.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface BoardMapper {
    // 글쓰기
    boolean write(String[] writeInfo);
    // 글 목록 가져오기
    List<String> get_all_contents();
}
