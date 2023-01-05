package com.oes.board_pj.mapper;

import com.oes.board_pj.vos.CommentVO;
import com.oes.board_pj.vos.ContentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface BoardMapper {
    // 글쓰기
    boolean write(String[] writeInfo);
    // 글 목록 가져오기
    List<ContentVO> get_all_contents();

    // 검색한 글들 가져오기
    List<ContentVO> get_search_contents(String selected, String searchText);

    // 글 정보 가져오기
    ContentVO get_content(int no);

    // 글 삭제
    boolean content_delete(int no);

    // 글 삭제할때 덧글도 같이 삭제
    boolean comment_delete_in_content(int no);

    // 글 수정
    boolean modify_content(int no, String title,String mainText);

    // 덧글 쓰기
    boolean comment_write(String commentText, String writer, String id, int contentNo);

    // 덧글 쓸때 parentNo 붙이기
    boolean comment_update_parent();

    // 덧글들 가져오기
    List<CommentVO> get_all_comments(int no);

    // 답글 달기
    boolean reply_write(int commentNo, String commentText, String writer, String id, int contentNo);

    // 덧글을 삭제할때 답글이 있는지 검사
    int comment_has_reply(int no);


    // 댓글 삭제
    boolean comment_delete(int no);

    // 댓글 더미로
    boolean comment_make_dummy(int no);

    // 조회수 증가
    boolean update_view(int no);

    // 전체 글 개수 가져오기
    int get_all_contents_cnt();

    // 현재 페이지에 해당하는 글들 가져오기
    List<ContentVO> get_contents_in_page(int order);
}
