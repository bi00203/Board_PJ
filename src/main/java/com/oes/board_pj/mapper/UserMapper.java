package com.oes.board_pj.mapper;

import com.oes.board_pj.vos.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    // 회원가입
    boolean register(UserVO vo);
    // 로그인 시도 시 유저 찾기
    UserVO find_user(@Param("id") String username);
}
