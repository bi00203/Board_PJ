const searchSelector = document.getElementById('search-selector');
const searchInfo = document.getElementById('search-info');
const PageViewUl = document.getElementById('page-container').getElementsByTagName('ul').item(0);

// 처음에 페이지 목록 출력
view_page_list();

function search_contents(){
    if(searchInfo.value.trim().length < 2 || searchInfo.value.trim() == ""){
        alert("2글자 이상 키워드를 입력해주세요");
        return false;
    }
    const searchText = encodeURI(searchInfo.value.trim());


    const selected = searchSelector.options[searchSelector.selectedIndex].value;
    location.href = `/board/main/${selected}/${searchText}/` + 1;
}

function view_page_list(){
    PageViewUl.innerHTML = '';
    var i = startPageNum;
    var j = endPageNum;

    // 첫 페이지가 1이 아니라면
    if(i != 1){
        PageViewUl.insertAdjacentHTML('beforeend','<li onclick="show_prev_page_list()">이전</li>');
    }

    for(i ; i<=j ; i++){
        if(i == nowPageNum) { // 현재 페이지라면 클래스 부여후 조작
            PageViewUl.insertAdjacentHTML('beforeend', '<li class="now-page" value=' + i + ' onclick="move_page(this.value)">' + i + '</li>');
        }
        else{
            PageViewUl.insertAdjacentHTML('beforeend', '<li value=' + i + ' onclick="move_page(this.value)">' + i + '</li>');
        }
    }
    // 마지막 페이지가 전체 페이지 개수가 아니라면
    if(j != allPageCnt){
        PageViewUl.insertAdjacentHTML('beforeend','<li onclick="show_next_page_list()">다음</li>');
    }
}

// 이전 버튼 누르면 페이지 넘버 수정후 함수 호출
function show_prev_page_list(){
    startPageNum = startPageNum - 5;
    endPageNum = startPageNum + 4;
    view_page_list();
}

// 다음 버튼 누르면 페이지 넘버 수정후 함수 호출
function show_next_page_list(){
    startPageNum = startPageNum + 5;
    if(startPageNum + 4 > allPageCnt){
        endPageNum = allPageCnt;
    }
    else{
        endPageNum = startPageNum + 4;
    }
    view_page_list();
}

// 클릭하면 해당 페이지로 이동
function move_page(pageNum){
    console.log(pageNum);

    if(isSearched == false) {
        location.href = `/board/main/${pageNum}`;
    }
    else{
        location.href = `/board/main/${selected}/${searchText}/${pageNum}`;
    }
}