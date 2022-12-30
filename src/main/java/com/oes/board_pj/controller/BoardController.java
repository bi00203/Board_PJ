package com.oes.board_pj.controller;

import com.oes.board_pj.dtos.UserDTO;
import com.oes.board_pj.service.BoardService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.security.PermitAll;

@Log4j2
@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @PermitAll
    @GetMapping("/main")
    public void main_get(Model model){
        log.info("------------------------main_get-------------------");
        model.addAttribute("contents", boardService.get_all_contents());

    }

    @PermitAll
    @GetMapping("/content")
    public void content_get(){
        log.info("------------------------content_get-------------------");
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/write")
    public void write_get(){
        log.info("------------------------write_get-------------------");
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/write")
    public String write_post(
            @AuthenticationPrincipal UserDTO userDTO,
            String title,
            String mainText
                             ){
        log.info("------------------------write_post-------------------");
        log.info(userDTO.getId());
        log.info(title);
        log.info(mainText);
        String[] writeInfo = {title,mainText, userDTO.getNick(), userDTO.getId()};
        boardService.write(writeInfo);
        return "redirect:/board/main";
    }
}
