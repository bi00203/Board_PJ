package com.oes.board_pj.service;

import com.oes.board_pj.mapper.BoardMapper;
import com.oes.board_pj.vos.CommentVO;
import com.oes.board_pj.vos.ContentVO;
import com.oes.board_pj.vos.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BoardService {

    @Autowired
    private BoardMapper boardMapper;

    // ----------------------------- 게시판 메인 페이징 관련 --------------------------------------------------

    // 전체 글 개수 가져오기
    public int get_all_contents_cnt() {
        return boardMapper.get_all_contents_cnt();
    }

    // 현재 페이지에 해당하는 글 목록
    public List<ContentVO> get_contents_in_page(int order) {
        return boardMapper.get_contents_in_page(order);
    }

    // 검색한 글 개수 가져오기
    public int get_search_contents_cnt(String selected, String searchText) {
        return boardMapper.get_search_contents_cnt(selected, searchText);
    }

    // 검색한 글들 중 현재 페이지에 해당하는 목록
    public List<ContentVO> get_search_contents_in_page(String selected, String searchText,int order) {
        return boardMapper.get_search_contents_in_page(selected,searchText,order);
    }

    // ----------------------------- 글 들어갔을 때 내부 정보 --------------------------------------------------

    // 해당 글 정보 가져오기
    public ContentVO get_content(int no){return boardMapper.get_content(no);}

    // 덧글 가져오기
    public List<CommentVO> get_all_comments(int no) { return boardMapper.get_all_comments(no);}

    // 조회수 증가
    public boolean update_view(int no) {
        return boardMapper.update_view(no);
    }


    // ----------------------------- 글 관련 --------------------------------------------------

    //글 쓰기
    public boolean write(String[] writeInfo){
        return boardMapper.write(writeInfo);
    }

    // 글 삭제
    public boolean content_delete(int no){return boardMapper.content_delete(no);};

    // 글 삭제 할때 덧글도 같이 삭제
    public boolean comment_delete_in_content(int no) {
        return boardMapper.comment_delete_in_content(no);
    }

    // 글 수정
    public boolean modify_content(int no, String title,String mainText){return boardMapper.modify_content(no,title,mainText);}


    // ----------------------------- 댓글, 답글 관련 --------------------------------------------------

    // 덧글 쓰기
    public boolean comment_write(String commentText, String writer, String id, int contentNo) {
        return boardMapper.comment_write(commentText,writer,id,contentNo);
    }
    // 덧글 쓸때 parentNo 붙이기
    public boolean comment_update_parent(){
        return boardMapper.comment_update_parent();
    }



    // 답글 쓰기
    public boolean reply_write(int commentNo, String commentText, String writer, String id, int contentNo) {
        return boardMapper.reply_write(commentNo,commentText,writer,id,contentNo);
    }


    // 덧글을 삭제할때 답글이 있는지 검사
    public int comment_has_reply(int no) {
        return boardMapper.comment_has_reply(no);
    }

    // 댓글 삭제
    public boolean comment_delete(int no) {
        return boardMapper.comment_delete(no);
    }

    // 댓글 더미로 유지
    public boolean comment_make_dummy(int no) { return boardMapper.comment_make_dummy(no); }



}
