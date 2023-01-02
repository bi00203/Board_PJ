package com.oes.board_pj.service;

import com.oes.board_pj.mapper.BoardMapper;
import com.oes.board_pj.vos.ContentVO;
import com.oes.board_pj.vos.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BoardService {

    @Autowired
    private BoardMapper boardMapper;

    //글 쓰기
    public boolean write(String[] writeInfo){
        return boardMapper.write(writeInfo);
    }

    //글 목록 가져오기
    public List<ContentVO> get_all_contents() { return boardMapper.get_all_contents();}

    // 해당 글 정보 가져오기
    public ContentVO get_content(int no){return boardMapper.get_content(no);}

    // 글 삭제
    public boolean content_delete(int no){return boardMapper.content_delete(no);};

    // 글 수정
    public boolean modify_content(int no, String title,String mainText){return boardMapper.modify_content(no,title,mainText);}
}
