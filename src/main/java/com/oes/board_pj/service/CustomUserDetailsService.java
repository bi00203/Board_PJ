package com.oes.board_pj.service;

import com.oes.board_pj.dtos.UserDTO;
import com.oes.board_pj.mapper.UserMapper;
import com.oes.board_pj.vos.UserVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Log4j2
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info(" ----------- loadUserByUsername -------------------- ");
        log.info(username + "이 로그인 시도 하였습니다!");

        UserVO userVO = userMapper.find_user(username);
        log.info(userVO);

        if (userVO == null) {
            throw new UsernameNotFoundException(username + ": ------ 해당 유저는 존재하지 않음! --------- ");
        }

        log.info("유저를 찾았습니다!");

        return new UserDTO(
                username,
                userVO.getPassword(),
                userVO.getNick(),
                userVO.getEmail(),
                userVO.getJoinDate(),
                userVO.getRole(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + userVO.getRole()))
        );
    }
}
