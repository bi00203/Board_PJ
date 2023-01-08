const selectedView = document.getElementById('selected-view').getElementsByTagName('table').item(0);
const PageViewUl = document.getElementById('page-container').getElementsByTagName('ul').item(0);

const [contentBtn, commentBtn, postWithCommentBtn] = [...document.getElementById('content-menu').getElementsByTagName('button')];
const [changeInfoBtn, logoutBtn, moveMainBtn] = [...document.getElementById('user-menu').getElementsByTagName('button')];
const firstContentPageInfo = [myContentNowPageNum,myContentStartPageNum,myContentEndPageNum];
const firstCommentPageInfo = [myCommentNowPageNum, myCommentStartPageNum, myCommentEndPageNum];
const firstPostsWithCommentPageInfo = [postsWithCommentNowPageNum, postsWithCommentStartPageNum, postsWithCommentEndPageNum];

const selectList = document.getElementsByName("content-select");
let selectFlag = 'CONTENT';
get_content_by_id(1);


contentBtn.onclick = () => {
    selectFlag = 'CONTENT';
    reset_page_info(); // 다른 페이지 정보들 리셋
    get_content_by_id(1);
}

commentBtn.onclick = () => {
    selectFlag = 'COMMENT';
    reset_page_info(); // 다른 페이지 정보들 리셋
    get_comment_by_id(1);
}

postWithCommentBtn.onclick = () => {
    selectFlag = 'POSTS_WITH_COMMENT';
    reset_page_info(); // 다른 페이지 정보들 리셋
    get_posts_with_comment_by_id(1);
}

changeInfoBtn.onclick = () => {
    location.href=`/user/mypage/info`;
}

logoutBtn.onclick = () => {
    location.href=`/logout`;
}

moveMainBtn.onclick = () =>{
    location.href='/board/main';
}
// 내 글 가져오기
function get_content_by_id(pageNum){
    console.log("가져오기")
    const request = new XMLHttpRequest();
    request.open('GET', '/user/mypage/content/' + pageNum);
    request.send();
    request.onload = () => {
        if(request.status === 200){
            create_content_data(JSON.parse(request.response));
        }
    }
}
// 내 글 목록 화면에 띄우기
function create_content_data(contentDatas){
    selectedView.innerHTML = '';
    selectedView.insertAdjacentHTML('beforeend','<colgroup>\n' +
        '        <col class="check-col">\n' +
        '        <col class="no" value="번호">\n' +
        '        <col class="title" value="제목">\n' +
        '        <col class="date" value="작성일">\n' +
        '        <col class="view" value="조회수">\n' +
        '      </colgroup>\n' +
        '      <thead>\n' +
        '      <tr>\n' +
        '        <th scope="col"><input type="checkbox" name="content-select" onclick="all_check(this)"></th>\n' +
        '        <th scope="col">번호</th>\n' +
        '        <th scope="col">제목</th>\n' +
        '        <th scope="col">작성일</th>\n' +
        '        <th scope="col">조회수</th>\n' +
        '      </tr>\n' +
        '      </thead>\n');

    if(contentDatas.length == 0){
        selectedView.insertAdjacentHTML('beforeend', '<tr>\n' +
            '      <td align="center" colspan="5">작성하신 글이 없습니다</td>\n' +
            '    </tr>\n');
    }
    else {
        for (data of contentDatas) {
            let date = new Date(data.writeDate);
            date = date.toLocaleString('ko-Kr',
                { hourCycle : "h23", year :"numeric",month : "2-digit", day : "2-digit",
                        hour :"2-digit", minute : "2-digit"});
            selectedView.insertAdjacentHTML('beforeend', '<tr>\n' +
                `      <td align="center"><input type="checkbox" name="content-select" value="${data.no}"></td>\n` +
                `      <td align="center">${data.no}</td>\n` +
                `      <td class="title" onclick="location.href='/board/content/${data.no}'">${data.title}<span>(${data.hasReply})</span></td>\n` +
                `      <td align="center">${date}</td>\n` +
                `      <td align="center">${data.view}</td>\n` +
                '    </tr>\n');
        }
    }
    console.log(contentDatas);
    view_page_list();
}

// 내 댓글 가져오기
function get_comment_by_id(pageNum){
    console.log("덧글 가져오기")
    const request = new XMLHttpRequest();
    request.open('GET', '/user/mypage/comment/' + pageNum);
    request.send();
    request.onload = () => {
        if(request.status === 200){
            create_comment_data(JSON.parse(request.response));
        }
    }
}
// 내 댓글 목록 화면에 띄우기
function create_comment_data(commentDatas){
    selectedView.innerHTML = '';
    selectedView.insertAdjacentHTML('beforeend','<colgroup>\n' +
        '      <col class="check-col" value="체크">\n' +
        '      <col class="comment-col" value="댓글">\n' +
        '    </colgroup>\n' +
        '    <thead>\n' +
        '      <tr>\n' +
        '        <th scope="col"><input type="checkbox" name="content-select" onclick="all_check(this)"></th>\n' +
        '        <th scope="col">댓글</th>\n' +
        '      </tr>\n' +
        '    </thead>\n');

    if(commentDatas.length == 0){
        selectedView.insertAdjacentHTML('beforeend', '<tr>\n' +
            '      <td align="center" colspan="2">작성하신 댓글이 없습니다</td>\n' +
            '    </tr>\n');
    }
    else {
        for (data of commentDatas) {
            let date = new Date(data.writeDate);
            date = date.toLocaleString('ko-Kr',
                { hourCycle : "h23", year :"numeric",month : "2-digit", day : "2-digit",
                            hour :"2-digit", minute : "2-digit"});
            selectedView.insertAdjacentHTML('beforeend', '<tr height="70">\n' +
                `        <td align="center"><input type="checkbox" name="content-select" value="${data.no}"></td>\n` +
                `        <td class="comment-title" onclick="location.href='/board/content/${data.parentNo}'">\n` +
                `          <span class="comment-info-span">${data.commentText}</span>\n` +
                `          <span class="comment-date-span">${date}</span>\n` +
                `          <span class="post-with-comment-span">${data.title}<span>(${data.hasReply})</span></span></td>\n` +
                '      </tr>');
        }
    }
    console.log(commentDatas);
    view_page_list();
}

// 내 댓글이 달린 글 가져오기
function get_posts_with_comment_by_id(pageNum){
    console.log("포스트 가져오기")
    const request = new XMLHttpRequest();
    request.open('GET', '/user/mypage/posts/' + pageNum);
    request.send();
    request.onload = () => {
        if(request.status === 200){
            create_posts_with_comment_data(JSON.parse(request.response));
        }
    }
}
// 내 댓글이 달린 글 목록 띄우기
function create_posts_with_comment_data(postDatas){
    selectedView.innerHTML = '';
    selectedView.insertAdjacentHTML('beforeend','<colgroup>\n' +
        '        <col width="5%" class="no" value="번호">\n' +
        '        <col width="64%" class="title" value="제목">\n' +
        '        <col width="8%" class="writer" value="작성자">\n' +
        '        <col width="15%" class="date" value="작성일">\n' +
        '        <col width="8%" class="view" value="조회수">\n' +
        '      </colgroup>\n' +
        '      <thead>\n' +
        '      <tr>\n' +
        '        <th scope="col">번호</th>\n' +
        '        <th scope="col">제목</th>\n' +
        '        <th scope="col">작성자</th>\n' +
        '        <th scope="col">작성일</th>\n' +
        '        <th scope="col">조회수</th>\n' +
        '      </tr>\n' +
        '      </thead>\n');
    if(postDatas.length == 0){
        selectedView.insertAdjacentHTML('beforeend', '<tr>\n' +
            '      <td align="center" colspan="5">댓글을 작성한 글이 없습니다</td>\n' +
            '    </tr>\n');
    }
    else {
        for (data of postDatas) {
            let date = new Date(data.writeDate);
            date = date.toLocaleString('ko-Kr',
                { hourCycle : "h23", year :"numeric", month : "2-digit", day : "2-digit",
                            hour :"2-digit", minute : "2-digit"});
            selectedView.insertAdjacentHTML('beforeend', '<tr>\n' +
                `      <td align="center">${data.no}</td>\n` +
                `      <td class="title" onclick="location.href='/board/content/${data.no}'">${data.title}<span>(${data.hasReply})</span></td>\n` +
                `      <td align="center">${data.writer}</td>\n` +
                `      <td align="center">${date}</td>\n` +
                `      <td align="center">${data.view}</td>\n` +
                '    </tr>');
        }
    }
    console.log(postDatas);
    view_page_list();
}

// 페이지 목록 띄우기
function view_page_list(){
    PageViewUl.innerHTML = '';
    let startPageNum = 0;
    let endPageNum = 0;
    let nowPageNum = 0;
    let allPageCnt = 0;
    switch (selectFlag) {
        case 'CONTENT':
            startPageNum = myContentStartPageNum;
            endPageNum = myContentEndPageNum;
            nowPageNum = myContentNowPageNum;
            allPageCnt = myContentAllPageCnt;
            break;
        case 'COMMENT':
            startPageNum = myCommentStartPageNum;
            endPageNum = myCommentEndPageNum;
            nowPageNum = myCommentNowPageNum;
            allPageCnt = myCommentAllPageCnt
            break;
        case 'POSTS_WITH_COMMENT':
            startPageNum = postsWithCommentStartPageNum;
            endPageNum = postsWithCommentEndPageNum;
            nowPageNum = postsWithCommentNowPageNum;
            allPageCnt = postsWithCommentAllPageCnt;
            break;
        default:
            break;
    }
    // 첫 페이지가 1이 아니라면
    if(startPageNum != 1){
        PageViewUl.insertAdjacentHTML('beforeend','<li onclick="show_prev_page_list()">이전</li>');
    }

    for(startPageNum ; startPageNum<=endPageNum ; startPageNum++){
        if(startPageNum == nowPageNum) { // 현재 페이지라면 클래스 부여후 조작
            PageViewUl.insertAdjacentHTML('beforeend', '<li class="now-page" value=' + startPageNum + ' onclick="move_page(this.value)">' + startPageNum + '</li>');
        }
        else{
            PageViewUl.insertAdjacentHTML('beforeend', '<li value=' + startPageNum + ' onclick="move_page(this.value)">' + startPageNum + '</li>');
        }
    }
    // 마지막 페이지가 전체 페이지 개수가 아니라면
    if(endPageNum != allPageCnt){
        PageViewUl.insertAdjacentHTML('beforeend','<li onclick="show_next_page_list()">다음</li>');
    }
}

// 이전 버튼 누르면 페이지 넘버 수정후 함수 호출
function show_prev_page_list(){
    switch (selectFlag) {
        case 'CONTENT':
            myContentStartPageNum = myContentStartPageNum - 5;
            myContentEndPageNum = myContentEndPageNum - 4;
            break;
        case 'COMMENT':
            myCommentStartPageNum = myCommentStartPageNum - 5;
            myCommentEndPageNum = myCommentEndPageNum - 4;
            break;
        case 'POSTS_WITH_COMMENT':
            postsWithCommentStartPageNum = postsWithCommentStartPageNum - 5;
            postsWithCommentEndPageNum = postsWithCommentEndPageNum - 4;
            break;
        default:
            break;
    }
    view_page_list();
}

// 다음 버튼 누르면 페이지 넘버 수정후 함수 호출
function show_next_page_list(){
    switch (selectFlag) {
        case 'CONTENT':
            myContentStartPageNum = myContentStartPageNum + 5;
            if(myContentStartPageNum + 4 > myContentAllPageCnt){
                myContentEndPageNum = myContentAllPageCnt;
            }
            else{
                myContentEndPageNum = myContentStartPageNum + 4;
            }
            break;
        case 'COMMENT':
            myCommentStartPageNum = myCommentStartPageNum + 5;
            if(myCommentStartPageNum + 4 > myCommentAllPageCnt){
                myCommentEndPageNum = myCommentAllPageCnt;
            }
            else{
                myCommentEndPageNum = myCommentStartPageNum + 4;
            }
            break;
        case 'POSTS_WITH_COMMENT':
            postsWithCommentStartPageNum = postsWithCommentStartPageNum + 5;
            if(postsWithCommentStartPageNum + 4 > postsWithCommentAllPageCnt){
                postsWithCommentEndPageNum = postsWithCommentAllPageCnt;
            }
            else{
                postsWithCommentEndPageNum = postsWithCommentStartPageNum + 4;
            }
            break;
        default:
            alert('페이지 넘버 수정 예외 발생');
            break;
    }
    view_page_list();
}

// 클릭하면 해당 페이지로 이동
function move_page(pageNum){
    switch (selectFlag) {
        case 'CONTENT':
            myContentNowPageNum = pageNum;
            get_content_by_id(pageNum);
            break;
        case 'COMMENT':
            myCommentNowPageNum = pageNum;
            get_comment_by_id(pageNum);
            break;
        case 'POSTS_WITH_COMMENT':
            postsWithCommentNowPageNum = pageNum;
            get_posts_with_comment_by_id(pageNum);
            break;
        default:
            alert('페이지 이동 예외 발생');
            break;
    }
}

// 다른 버튼 클릭시 페이징 정보들을 초기화 한다
function reset_page_info(){
    switch (selectFlag) {
        case 'CONTENT':
            myCommentNowPageNum = firstCommentPageInfo[0];
            myCommentStartPageNum = firstCommentPageInfo[1];
            myCommentEndPageNum = firstCommentPageInfo[2];

            postsWithCommentNowPageNum = firstPostsWithCommentPageInfo[0];
            postsWithCommentStartPageNum = firstPostsWithCommentPageInfo[1];
            postsWithCommentEndPageNum = firstPostsWithCommentPageInfo[2];
            break;
        case 'COMMENT':
            myContentNowPageNum = firstContentPageInfo[0];
            myContentStartPageNum = firstContentPageInfo[1];
            myContentEndPageNum = firstContentPageInfo[2];

            postsWithCommentNowPageNum = firstPostsWithCommentPageInfo[0];
            postsWithCommentStartPageNum = firstPostsWithCommentPageInfo[1];
            postsWithCommentEndPageNum = firstPostsWithCommentPageInfo[2];
            break;
        case 'POSTS_WITH_COMMENT':
            myContentNowPageNum = firstContentPageInfo[0];
            myContentStartPageNum = firstContentPageInfo[1];
            myContentEndPageNum = firstContentPageInfo[2];

            myCommentNowPageNum = firstCommentPageInfo[0];
            myCommentStartPageNum = firstCommentPageInfo[1];
            myCommentEndPageNum = firstCommentPageInfo[2];
            break;
        default:
            alert('리셋 페이지 예외 발생');
            break;
    }
}

function all_check(allSelect){
    selectList.forEach( (select) =>{
        select.checked= allSelect.checked;
    })
}
// 체크된 것들 삭제
function delete_checked_info(){
    let mySelectList = [];
    let listSize = 0;
    selectList.forEach( (select)  =>{
        if(select.checked == true){
            if(select.value != "on") {
                mySelectList.push(select.value);
                console.log("value : " + select.value);
            }
        }
    })
    console.log("mylist : " +mySelectList)
    listSize = mySelectList.length;
    if(listSize == 0){
        alert("체크된 항목이 없습니다");
        return false;
    }
    if(confirm('정말 삭제하시겠습니까?') == false){
        return false;
    }

    console.log(selectFlag);
    switch (selectFlag) {
        case 'CONTENT':
            for(let i = 0 ; i <listSize ; i++){
                console.log(mySelectList[i] +'번 글 삭제됨');
                const request = new XMLHttpRequest();
                request.open('GET', '/board/delete/' + mySelectList[i],false);
                request.send();
            }
            break;
        case 'COMMENT':
            for(let i = 0 ; i <listSize ; i++){
                console.log(mySelectList[i] +'번 댓글 삭제됨');
                const request = new XMLHttpRequest();
                request.open('GET', '/user/comment/delete/' + mySelectList[i],false);
                request.send();
            }
            break;
        default:
            alert('삭제 예외 발생');
            break;
    }

    location.href = `/user/mypage/main`;
}