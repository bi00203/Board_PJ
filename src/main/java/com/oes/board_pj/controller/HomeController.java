package com.oes.board_pj.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.security.PermitAll;

@Log4j2
@Controller
public class HomeController {

    @PermitAll
    @GetMapping("/")
    public String main(){

        return "redirect:/home";
    }
    @PermitAll
    @GetMapping("/home")
    public void home(){
        log.info("------------------------home_get-------------------");
    }

}
