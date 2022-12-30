package com.oes.board_pj.service;

import com.oes.board_pj.mapper.BoardMapper;
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
    public List<String> get_all_contents() { return boardMapper.get_all_contents();}
}
