const form = document.forms.namedItem('info-form');
const [confirmBtn, backBtn] = [...document.getElementById('info-buttons').getElementsByTagName('input')];
confirmBtn.addEventListener('click', () => {
    form.action = '/user/mypage/info';
    form.method = 'post';
    form.submit();
});

backBtn.addEventListener('click', () => {
    form.action = '/user/mypage/main';
    form.method = 'get';
    form.submit();
})