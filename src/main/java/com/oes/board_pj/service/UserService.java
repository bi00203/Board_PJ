package com.oes.board_pj.service;

import com.oes.board_pj.mapper.UserMapper;
import com.oes.board_pj.vos.ContentVO;
import com.oes.board_pj.vos.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //유저 회원가입
    public boolean register(UserVO vo){
        vo.setPassword(passwordEncoder.encode(vo.getPassword()));
        return userMapper.register(vo);
    }

    // 해당 유저의 글 개수
    public int get_my_content_cnt(String id) { return userMapper.get_my_content_cnt(id);}
    // 해당 유저의 덧글 개수
    public int get_my_comment_cnt(String id) { return userMapper.get_my_comment_cnt(id);}
    // 해당 유저가 쓴 댓글이 달린 글 개수
    public int get_posts_with_comment_cnt(String id) {return userMapper.get_posts_with_comment_cnt(id);}

    //내 글 목록
    public List<HashMap<String, Object>> get_my_content(String id,int order) {
        return userMapper.get_my_content(id,order);
    }
    // 내 댓글 목록
    public List<HashMap<String,Object>> get_my_comment(String id, int order) {
        return userMapper.get_my_comment(id,order);
    }

    // 내 댓글이 있는 글 목록
    public List<ContentVO> get_posts_with_comment(String id, int order) {
        return userMapper.get_posts_with_comment(id, order);
    }
    // 회원 정보 수정
    public boolean modify_user(UserVO vo) {
        return userMapper.modify_user(vo);
    }

    // 아이디, 이메일, 닉네임 중복 검사
    public int check_same_id(String data) {
        return userMapper.check_same_id(data);
    }
    public int check_same_nick(String data) {
        return userMapper.check_same_nick(data);
    }
    public int check_same_email(String data) {
        return userMapper.check_same_email(data);
    }
}
