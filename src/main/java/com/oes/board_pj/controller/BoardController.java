package com.oes.board_pj.controller;

import com.oes.board_pj.dtos.UserDTO;
import com.oes.board_pj.service.BoardService;
import com.oes.board_pj.vos.ContentVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

//    @PermitAll
//    @GetMapping("/content")
//    public void content_get(){
//        log.info("------------------------content_get-------------------");
//    }

    @PermitAll
    @GetMapping("/content/{no}")
    public String content_get(
            @AuthenticationPrincipal UserDTO userDTO,
            @PathVariable int no,
            Model model
    ){
        log.info("-------------content_get--------------" + no);
        // 해당 글의 정보
        model.addAttribute("content",boardService.get_content(no));
        return "/board/content";
    }

    // 글 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/content/{no}")
    public String content_delete( @PathVariable int no){
        log.info("-------------content_delete--------------");
        boardService.content_delete(no);

        return "redirect:/board/main";
    }

    // 글 쓰기
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/write")
    public void write_get(Model model)
    {
        ContentVO contentVO = new ContentVO();
        log.info(contentVO);
        log.info("------------------------write_get-------------------");
        model.addAttribute("content",contentVO);
    }

    // 글 수정 페이지로
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/write/{no}")
    public String modify_get(
            @AuthenticationPrincipal UserDTO userDTO,
            @PathVariable int no,
            Model model
    ){
        log.info("------------------------modify_get-------------------");
        model.addAttribute("content",boardService.get_content(no));
        return "/board/write";
    }

    // 수정 버튼 눌렀을시
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/modify")
    public  String modify_put(
            String title,
            String mainText
    ){
        log.info("------------------------modify_put-------------------");
//        boardService.modify_content
        return "redirect:/board/main";
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
