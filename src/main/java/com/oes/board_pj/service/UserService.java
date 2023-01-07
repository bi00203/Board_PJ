package com.oes.board_pj.service;

import com.oes.board_pj.mapper.UserMapper;
import com.oes.board_pj.vos.ContentVO;
import com.oes.board_pj.vos.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public List<ContentVO> get_my_content(String id,int order) {
        return userMapper.get_my_content(id,order);
    }
}
