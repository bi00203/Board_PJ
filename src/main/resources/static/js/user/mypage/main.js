const selectedView = document.getElementById('selected-view').getElementsByTagName('table').item(0);
const PageViewUl = document.getElementById('page-container').getElementsByTagName('ul').item(0);

const [contentBtn, commentBtn, postWithCommentBtn] = [...document.getElementById('content-menu').getElementsByTagName('button')];
const [changeInfoBtn, logoutBtn] = [...document.getElementById('user-menu').getElementsByTagName('button')];
const firstContentPageInfo = [myContentNowPageNum,myContentStartPageNum,myContentEndPageNum];
const firstCommentPageInfo = [myCommentNowPageNum, myCommentStartPageNum, myCommentEndPageNum];
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
}

postWithCommentBtn.onclick = () => {
    selectFlag = 'POST_WITH_COMMENT';
    reset_page_info(); // 다른 페이지 정보들 리셋
}

changeInfoBtn.onclick = () => {

}

logoutBtn.onclick = () => {
    location.href=`/logout`;
}

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

function create_content_data(contentDatas){
    selectedView.innerHTML = '';
    selectedView.insertAdjacentHTML('beforeend','<colgroup>\n' +
        '        <col class="check-col" value="체크">\n' +
        '        <col class="no" value="번호">\n' +
        '        <col class="title" value="제목">\n' +
        '        <col class="date" value="작성일">\n' +
        '        <col class="view" value="조회수">\n' +
        '      </colgroup>\n' +
        '      <thead>\n' +
        '      <tr>\n' +
        '        <th scope="col"></th>\n' +
        '        <th scope="col">번호</th>\n' +
        '        <th scope="col">제목</th>\n' +
        '        <th scope="col">작성일</th>\n' +
        '        <th scope="col">조회수</th>\n' +
        '      </tr>\n' +
        '      </thead>\n' +
        '      <tbody>')
    for(data of contentDatas) {
        let date = new Date(data.writeDate);
        selectedView.insertAdjacentHTML('beforeend', '<tr>\n' +
            `      <td align="center"><input type="checkbox"></td>\n` +
            `      <td align="center">${data.no}</td>\n` +
            `      <td class="title" onclick="location.href='/board/content/${data.no}'">${data.title}<span>(${data.hasReply})</span></td>\n` +
            `      <td align="center">${date.toLocaleString()}</td>\n` +
            `      <td align="center">${data.view}</td>\n` +
            '    </tr>');
    }
    selectedView.insertAdjacentHTML('beforeend','</tbody>');
    console.log(contentDatas);
    view_page_list();
}

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
        case 'POST_WITH_COMMENT':
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
        case 'POST_WITH_COMMENT':
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
        case 'POST_WITH_COMMENT':
            break;
        default:
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
            break;
        case 'POST_WITH_COMMENT':
            break;
        default:
            break;
    }
}

function reset_page_info(){
    switch (selectFlag) {
        case 'CONTENT':
            //댓글 페이지 정보 초기로
            myCommentNowPageNum = firstCommentPageInfo[0];
            myCommentStartPageNum = firstCommentPageInfo[1];
            myCommentEndPageNum = firstCommentPageInfo[2];
            break;
        case 'COMMENT':
            myContentNowPageNum = firstContentPageInfo[0];
            myContentStartPageNum = firstContentPageInfo[1];
            myContentEndPageNum = firstContentPageInfo[2];
            break;
        case 'POST_WITH_COMMENT':
            myContentNowPageNum = firstContentPageInfo[0];
            myContentStartPageNum = firstContentPageInfo[1];
            myContentEndPageNum = firstContentPageInfo[2];

            myCommentNowPageNum = firstCommentPageInfo[0];
            myCommentStartPageNum = firstCommentPageInfo[1];
            myCommentEndPageNum = firstCommentPageInfo[2];
            break;
        default:
            break;
    }
}
// '<li>\n' +
// `          <img src="/images/program/${data.programName}/poster/${data.watchOrder}.webp" alt="">\n` +
// `          <div>${data.title} ${data.watchOrder}화</div>\n` +
// `          <div>${data.watchDate} 시청</div>\n` +
// '        </li>');