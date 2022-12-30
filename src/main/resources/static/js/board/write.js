const form = document.forms.namedItem('write-form');
const [confirmBtn, cancelBtn] = [...document.getElementById('register-buttons').getElementsByTagName('input')];
confirmBtn.addEventListener('click', () => {
    form.action = '/board/write';
    form.method = 'post';
    form.submit();
});

cancelBtn.addEventListener('click', () => {
    form.action = '/board/main';
    form.method = 'get';
    form.submit();
})