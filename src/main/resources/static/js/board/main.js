const searchSelector = document.getElementById('search-selector');
const searchInfo = document.getElementById('search-info');
function search_contents(){
    // const searchText = '%' + searchInfo.value.trim() + '%';
    const searchText = encodeURI(searchInfo.value.trim());
    console.log(searchText);
    if(searchText ==''){
        alert("내용을 입력해주세요");
        return false;
    }
    const selected = searchSelector.options[searchSelector.selectedIndex].value;
    location.href = `/board/main/${selected}/${searchText}`;
}