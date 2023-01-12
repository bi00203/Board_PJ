const form = document.forms.namedItem('info-form');
const [confirmBtn, backBtn] = [...document.getElementById('info-buttons').getElementsByTagName('input')];
const confirmCheck = {nick: false, email: false};
const inputTags = document.getElementsByTagName('input');

const userNick = document.getElementById("info-input-nick");
const userEmail = document.getElementById("info-input-email");
const checkNick = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
const checkSpace = /\s/g;
const checkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

confirmBtn.addEventListener('click', () => {
    if(!confirm_check()){
        alert("모든 항목을 정확히 입력해주세요");
        return;
    }
    form.action = '/user/mypage/info';
    form.method = 'post';
    form.submit();
});

backBtn.addEventListener('click', () => {
    form.action = '/user/mypage/main';
    form.method = 'get';
    form.submit();
})
function confirm_check(){
    console.log(confirmCheck);
    for(const key in confirmCheck) {
        if (!confirmCheck[key]) {
            return false;
        }
    }
    return true;
}

function check_nick(userNick) {
    // 닉네임 검사
    confirmCheck.nick = false;
    const nickCheck = "nick=" + userNick;
    const warnNick = document.getElementById("nick-warn-span");
    if(userNick === myNick){
        warnNick.innerHTML ="닉네임이 기존과 동일합니다";
    }
    else if(userNick === ""){
        warnNick.innerHTML = "필수 정보입니다";
    }
    else if(checkSpace.test(userNick)){
        warnNick.innerHTML = "공백을 제거해주세요";
    }
    else if(!checkNick.test(userNick)){
        warnNick.innerHTML = "특수문자는 사용이 불가능 합니다";
    }
    else if(userNick.length < 2 || userNick.length > 10){
        warnNick.innerHTML = "2 ~ 10자로 입력해주세요"
    }
    else{
        $.ajax({ // 닉네임 중복 검사
            contentType:'application/json;charset=UTF-8',
            type: "POST",
            url: "/user/register/check",
            data: JSON.stringify(nickCheck),
            dataType: "json",
            success: function (result) {
                if (result > 0) {
                    warnNick.innerHTML = "이미 있는 닉네임 입니다"; }
                else{
                    warnNick.innerHTML ="";
                    confirmCheck.id = true;
                }
            }
        });
    }
}

function check_email(userEmail) {
    confirmCheck.email = false;
    const emailCheck = "email=" + userEmail;
    const warnEmail = document.getElementById("email-warn-span");
    // 이메일 검사
    if(myEmail === userEmail){
        warnEmail.innerHTML ="기존 이메일과 동일합니다";
    }
    else if(userEmail === ""){
        warnEmail.innerHTML = "필수 정보입니다";
    }
    else if(!checkEmail.test(userEmail)){
        warnEmail.innerHTML = "이메일 주소를 형식에 맞게 입력해주세요";
    }
    else{
        $.ajax({ // 이메일 중복 검사
            contentType:'application/json;charset=UTF-8',
            type: "POST",
            url: "/user/register/check",
            data: JSON.stringify(emailCheck),
            dataType: "json",
            success: function (result) {
                if (result > 0) {
                    warnEmail.innerHTML = "이미 등록되어있는 이메일 입니다"; }
                else{
                    warnEmail.innerHTML ="";
                    confirmCheck.id = true;
                }
            }
        });
    }
}

function event_handler(e){
    const targetValue = e.target.value;
    switch (e.target){
        case userNick:
            check_nick(targetValue);
            break;
        case userEmail:
            check_email(targetValue);
            break;
    }
}
[...inputTags].forEach( inputTag => {
    inputTag.addEventListener('change', e => {
            event_handler(e);
        }
    );
});