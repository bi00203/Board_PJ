const deleteBtn = document.getElementById("delete-span");
const modifyBtn = document.getElementById("modify-span");
const no = document.getElementById("content-no").getAttribute('name')
const form = document.forms.namedItem('comment-form');
const commentBtn = document.getElementById()



deleteBtn.addEventListener('click', () => {
    console.log(no);
    if(confirm("정말 삭제하시겠습니까?") == true){
        // const request = new XMLHttpRequest();
        // request.open('DELETE',`/board/content/${no}`)
        // request.send();
        location.href=`/board/delete/${no}`;
    }
    else{
        return false;
    }
})

modifyBtn.addEventListener('click', () => {
        // const request = new XMLHttpRequest();
        // request.open('GET',`/board/write/${no}`)
        // request.send();
        location.href = `/board/write/${no}`;
})