package com.oes.board_pj.controller;

import com.oes.board_pj.dtos.ContentPageDTO;
import com.oes.board_pj.dtos.UserDTO;
import com.oes.board_pj.service.UserService;
import com.oes.board_pj.vos.ContentVO;
import com.oes.board_pj.vos.UserVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

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

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/mypage/main")
    public void mypage_main_get(
            @AuthenticationPrincipal UserDTO userDTO,
            Model model
    ){
        log.info("------------------------mypage_main_get-------------------");
        String id = userDTO.getId();

        int myContentCnt = userService.get_my_content_cnt(id);
        int myCommentCnt = userService.get_my_comment_cnt(id);
        ContentPageDTO myContentPageDTO = new ContentPageDTO(myContentCnt,1);
        ContentPageDTO myCommentPageDTO = new ContentPageDTO(myCommentCnt,1);
        log.info("myContentPageDTO = " + myContentPageDTO);
        log.info("myCommentPageDTO = " + myCommentPageDTO);
        model.addAttribute("myContentPage", myContentPageDTO);
        model.addAttribute("myCommentPage", myCommentPageDTO);

    }

    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    @GetMapping("/mypage/content/{pageNum}")
    public List<ContentVO> mypage_content_get(
            @AuthenticationPrincipal UserDTO userDTO,
            @PathVariable int pageNum
    ){
        log.info("------------------------mypage_content_get-------------------");
        String id = userDTO.getId();
        int order = (pageNum - 1) * 10;
        return userService.get_my_content(id,order);
    }
}
