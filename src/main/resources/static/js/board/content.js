const deleteBtn = document.getElementById('delete-span');
const modifyBtn = document.getElementById('modify-span');
const no = document.getElementById("content-no").getAttribute('name')
const commentForm = document.forms.namedItem('comment-form');
const commentBtn = document.getElementById('comment-write');

if(deleteBtn !== null) {
// 글 삭제
    deleteBtn.addEventListener('click', () => {
        console.log(no);
        if (confirm("정말 삭제하시겠습니까?") == true) {
            location.href = `/board/delete/${no}`;
        } else {
            return false;
        }
    })
}

if(modifyBtn !== null) {
    // 글 수정
    modifyBtn.addEventListener('click', () => {
        location.href = `/board/write/${no}`;
    })

}

// 덧글 달기
commentBtn.addEventListener('click', () => {
    commentForm.action = '/board/comment';
    commentForm.method = 'post';
    commentForm.submit();
})

function display_reply(button){
    const commentChildDiv = button.parentElement.nextElementSibling;

    if(commentChildDiv.style.display === 'flex'){
        commentChildDiv.style.display = 'none';
    }
    else{
        commentChildDiv.style.display = 'flex';
    }
}

function reply_comment(button){
    const replyForm = button.parentElement;
    replyForm.action = '/board/reply/' + replyForm.name;
    replyForm.method = 'post';
    replyForm.submit();
}