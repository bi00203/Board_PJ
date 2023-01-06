package com.oes.board_pj.mapper;

import com.oes.board_pj.vos.ContentVO;
import com.oes.board_pj.vos.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    // 회원가입
    boolean register(UserVO vo);
    // 로그인 시도 시 유저 찾기
    UserVO find_user(@Param("id") String username);

    // 해당 유저의 글 개수
    int get_content_cnt(String id);
    // 해당 유저의 덧글 개수
    int get_comment_cnt(String id);

    List<ContentVO> get_my_content(String id);
}
