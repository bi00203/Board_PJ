const form = document.forms.namedItem('write-form');
const [confirmBtn, cancelBtn] = [...document.getElementById('register-buttons').getElementsByTagName('input')];
console.log(confirmBtn.value);
confirmBtn.addEventListener('click', () => {

    if(confirmBtn.value == '등록') {
        form.action = '/board/write';
        form.method = 'post';
        form.submit();
    }
    else{
        form.action = '/board/modify';
        form.method = 'put';
        form.submit();
    }
});

cancelBtn.addEventListener('click', () => {
    form.action = '/board/main';
    form.method = 'get';
    form.submit();
})