package com.oes.board_pj.service;

import com.oes.board_pj.mapper.UserMapper;
import com.oes.board_pj.vos.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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




}
