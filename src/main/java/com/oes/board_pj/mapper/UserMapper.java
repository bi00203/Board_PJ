package com.oes.board_pj.mapper;

import com.oes.board_pj.vos.ContentVO;
import com.oes.board_pj.vos.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserMapper {

    // 회원가입
    boolean register(UserVO vo);
    // 로그인 시도 시 유저 찾기
    UserVO find_user(@Param("id") String username);

    // 해당 유저의 글 개수
    int get_my_content_cnt(String id);
    // 해당 유저의 덧글 개수
    int get_my_comment_cnt(String id);
    // 해당 유저의 댓글이 달린 글 개수
    int get_posts_with_comment_cnt(String id);

    // 내 글 목록
    List<HashMap<String, Object>> get_my_content(String id, int order);
    // 내 댓글 목록
    List<HashMap<String, Object>> get_my_comment(String id, int order);
    // 내 댓글이 있는 글 목록
    List<ContentVO> get_posts_with_comment(String id, int order);
    // 회원 정보 수정
    boolean modify_user(UserVO vo);
}
