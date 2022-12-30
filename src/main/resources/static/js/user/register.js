const form = document.forms.namedItem('register-form');
const [confirmBtn, backBtn] = [...document.getElementById('register-buttons').getElementsByTagName('input')];
confirmBtn.addEventListener('click', () => {
    form.action = '/user/register';
    form.method = 'post';
    form.submit();
});

backBtn.addEventListener('click', () => {
    form.action = '/user/login';
    form.method = 'get';
    form.submit();
})