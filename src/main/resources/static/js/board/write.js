const wrteForm = document.forms.namedItem('write-form');
const [confirmBtn, cancelBtn] = [...document.getElementById('register-buttons').getElementsByTagName('input')];
confirmBtn.addEventListener('click', () => {

    if(wrteForm.firstElementChild.firstElementChild.value.trim() == "" ||
       wrteForm.firstElementChild.firstElementChild.nextElementSibling.value.trim() == ""){
        alert("제목, 내용을 입력해주세요");
        return false;
    }
    if(confirmBtn.value == '등록') {
        wrteForm.action = '/board/write';
        wrteForm.method = 'post';
        wrteForm.submit();
    }
    else{
        if(confirm("수정 하시겠습니까?")) {
            wrteForm.action = '/board/modify';
            wrteForm.method = 'post';
            wrteForm.submit();
        }
        else{
            return false;
        }
    }
});

cancelBtn.addEventListener('click', () => {
    location.href = `/board/main`;
})