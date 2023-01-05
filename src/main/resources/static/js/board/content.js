const deleteBtn = document.getElementById('delete-span');
const modifyBtn = document.getElementById('modify-span');
const contentNo = document.getElementById("content-no").getAttribute('name')
const commentForm = document.forms.namedItem('comment-form');
const commentBtn = document.getElementById('comment-write');

if(deleteBtn !== null) {
// 글 삭제
    deleteBtn.addEventListener('click', () => {
        if (confirm("정말 삭제하시겠습니까?") == true) {
            location.href = `/board/delete/${contentNo}`;
        } else {
            return false;
        }
    })
}

if(modifyBtn !== null) {
    // 글 수정
    modifyBtn.addEventListener('click', () => {
        location.href = `/board/write/${contentNo}`;
    })

}

if(commentBtn !== null) {
// 덧글 달기
    commentBtn.addEventListener('click', () => {
        if(commentForm.firstElementChild.value.trim() == ""){
            alert("내용을 입력하세요");
            return false;
        }
        commentForm.action = '/board/comment';
        commentForm.method = 'post';
        commentForm.submit();
    })
}

// 답글 창 띄우기
function display_reply(button){
    const commentChildDiv = button.parentElement.nextElementSibling;

    if(commentChildDiv.style.display === 'flex'){
        commentChildDiv.style.display = 'none';
    }
    else{
        commentChildDiv.style.display = 'flex';
    }
}

// 답글 달기
function reply_comment(button){
    const replyForm = button.parentElement;
    if(replyForm.firstElementChild.value.trim() == ""){
        alert("내용을 입력하세요");
        return false;
    }
    replyForm.action = '/board/reply';
    replyForm.method = 'post';
    replyForm.submit();
}

// 댓글 삭제
function delete_comment(button){
    const commentNo = button.parentElement.firstElementChild.value;
    if (confirm("정말 삭제하시겠습니까?") == true) {
        location.href = `/board/comment/delete/${commentNo}/${contentNo}`;
    }
    else{
        return false;
    }
}