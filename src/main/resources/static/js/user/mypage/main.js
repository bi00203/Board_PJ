const selectedView = document.getElementById('selected-view').getElementsByTagName('table').item(0);
const [contentBtn, commentBtn, hasMyCommentBtn] = [...document.getElementById('content-menu').getElementsByTagName('button')];
const [changeInfoBtn, logoutBtn] = [...document.getElementById('user-menu').getElementsByTagName('button')];
console.log(id);
contentBtn.onclick = () => {
    get_content_by_id();
}

commentBtn.onclick = () => {

}

hasMyCommentBtn.onclick = () => {

}

changeInfoBtn.onclick = () => {

}

logoutBtn.onclick = () => {
    location.href=`/logout`;
}

function get_content_by_id(){
    console.log("가져오기")
    const request = new XMLHttpRequest();
    request.open('GET', '/user/mypage/content');
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
}
// '<li>\n' +
// `          <img src="/images/program/${data.programName}/poster/${data.watchOrder}.webp" alt="">\n` +
// `          <div>${data.title} ${data.watchOrder}화</div>\n` +
// `          <div>${data.watchDate} 시청</div>\n` +
// '        </li>');