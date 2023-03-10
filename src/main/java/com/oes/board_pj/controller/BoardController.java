package com.oes.board_pj.controller;

import com.oes.board_pj.dtos.ContentPageDTO;
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
import java.util.Date;
import java.util.List;

@Log4j2
@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    // 메인 -> 바로 게시판 1페이지로 이동
    @PermitAll
    @GetMapping("/main")
    public String main_get(Model model){
        log.info("------------------------main_get-------------------");
        return "redirect:/board/main/" + 1;
    }

    // 해당 페이지의 정보 처리
    @PermitAll
    @GetMapping("/main/{pageNum}")
    public String main_get(
            @PathVariable int pageNum,
            Model model
    ){
        log.info("------------------------main_get-------------------");
        int order = (pageNum - 1) * 10;
        int allContentCnt = boardService.get_all_contents_cnt();
        List<ContentVO> contents = boardService.get_contents_in_page(order);
        ContentPageDTO contentPageDTO = new ContentPageDTO(allContentCnt, pageNum, contents, false);

        log.info("contentPageDTO = " + contentPageDTO);
        model.addAttribute("page", contentPageDTO);
        return "board/main";
    }

    // 검색, 최초는 1페이지로
    // 검색한 컨텐츠만 가져오고 메인과 동일하다
    @PermitAll
    @GetMapping("/main/{selected}/{searchText}/{pageNum}")
    public String search_get(
            @PathVariable String selected,
            @PathVariable String searchText,
            @PathVariable int pageNum,
            Model model){
        log.info("------------------------search_get-------------------");
        String backupSearchText = searchText;
        searchText = '%' + searchText + '%';
        int order = (pageNum - 1) * 10;
        int searchContentCnt = boardService.get_search_contents_cnt(selected,searchText);
        List<ContentVO> contents = boardService.get_search_contents_in_page(selected,searchText,order);
        ContentPageDTO contentPageDTO = new ContentPageDTO(searchContentCnt, pageNum, contents, true);

        model.addAttribute("page", contentPageDTO);
        // 검색상태를 유지한 채 페이지 이동을 위해 해당 변수를 다시 전달한다
        model.addAttribute("selected",selected);
        model.addAttribute("searchText",backupSearchText);
        return "board/main";
    }

    // 글을 클릭했을 때
    @PermitAll
    @GetMapping("/content/{no}")
    public String content_get(
            @PathVariable int no,
            Model model
    ){
        log.info("-------------content_get--------------" + no);
        // 조회수 증가
        boardService.update_view(no);
        // 해당 글의 정보
        model.addAttribute("content",boardService.get_content(no));
        // 해당 글의 댓글정보
        model.addAttribute("comments",boardService.get_all_comments(no));
        return "board/content";
    }

    // 글 삭제
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/delete/{no}")
    public String content_delete( @PathVariable int no){
        log.info("-------------content_delete--------------");
        //글 삭제
        boardService.content_delete(no);
        return "redirect:/board/main";
    }

    // 글 쓰기
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/write")
    public void write_get(Model model)
    {
        ContentVO contentVO = new ContentVO();
        log.info("------------------------write_get-------------------");
        model.addAttribute("content",contentVO);
    }

    // 글 수정 페이지로
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/write/{no}")
    public String modify_get(
            @PathVariable int no,
            Model model
    ){
        log.info("------------------------modify_get-------------------");
        log.info(boardService.get_content(no));
        model.addAttribute("content",boardService.get_content(no));
        return "board/write";
    }

    // 수정 버튼 눌렀을시
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/modify")
    public  String modify_post(
            int no,
            String title,
            String mainText
    ){
        log.info("------------------------modify_post-------------------");
        boardService.modify_content(no,title,mainText);
        return "redirect:/board/main";
    }

    // 글 등록
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

    // 댓글 등록
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/comment")
    public String comment_post(
            @AuthenticationPrincipal UserDTO userDTO,
            int contentNo,
            String commentText
    ){
        log.info("------------------------comment_post-------------------");
        String id = userDTO.getId();
        String writer = userDTO.getNick();
        boardService.comment_write(commentText,writer,id,contentNo);
        boardService.comment_update_parent();
        return "redirect:/board/content/" + contentNo;
    }

    // 답글 달기
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/reply")
    public String reply_post(
            @AuthenticationPrincipal UserDTO userDTO,
            int contentNo,
            int commentNo,
            String commentText
    ){
        log.info("------------------------reply_post-------------------");
        log.info(userDTO.getId());
        log.info(userDTO.getNick());
        log.info(contentNo);
        log.info(commentNo);
        log.info(commentText);
        String id = userDTO.getId();
        String writer = userDTO.getNick();
        boardService.reply_write(commentNo,commentText,writer,id,contentNo);
//        boardService.comment_update_parent();
        return "redirect:/board/content/" + contentNo;
    }

    // 댓글, 답글 삭제
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/comment/delete/{no}/{contentNo}")
    public String comment_delete(
            @PathVariable int no,
            @PathVariable int contentNo){
        log.info("-------------comment_delete--------------");
        // 덧글을 삭제할때 답글이 있는지 검사
        if(boardService.comment_has_reply(no) == 1 || boardService.comment_has_reply(no) == 0){
            //답글이 없다면
            boardService.comment_delete(no);
        }
        else{
            boardService.comment_make_dummy(no);
        }
        return "redirect:/board/content/" + contentNo;
    }


}
