package com.oes.board_pj.controller;

import com.oes.board_pj.service.UserService;
import com.oes.board_pj.vos.UserVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.security.PermitAll;

@Log4j2
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PermitAll
    @GetMapping("/login")
    public void login_get(){
        log.info("------------------------login_get-------------------");
    }

    @PostMapping("/login")
    public String login_post(String username, String password){
        log.info("------------------------login_post-------------------");
        log.info("아이디: " + username + " 비밀번호: " + password);

        return "redirect:/board/main";
    }

    @PermitAll
    @GetMapping("/register")
    public void register_get(){
        log.info("------------------------register_get-------------------");
    }

    @PermitAll
    @PostMapping("/register")
    public String register_post(UserVO vo){
        log.info("------------------------register_post-------------------");
        log.info(vo);
        userService.register(vo);
        return "redirect:/user/login";

    }
}
