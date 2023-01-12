const confirmCheck = {id: false, pw: false, pw_re: false, nick: false, email: false};
const form = document.forms.namedItem('register-form');
const [confirmBtn, backBtn] = [...document.getElementById('register-buttons').getElementsByTagName('input')];
const inputTags = document.getElementsByTagName('input');
const userID = document.getElementById("register-input-id");
const userPW = document.getElementById("register-input-pw");
const userPW_RE = document.getElementById("register-input-pw-re");
const userNick = document.getElementById("register-input-nick");
const userEmail = document.getElementById("register-input-name");

const checkID = /^[a-zA-Z0-9]+$/;
const checkNick = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
const checkSpace = /\s/g;
const checkPW =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9]).{8,15}$/;
const checkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

confirmBtn.addEventListener('click', () => {
    if(!confirm_check()){
        alert("모든 항목을 정확히 입력해주세요");
        return;
    }
    form.action = '/user/register';
    form.method = 'post';
    form.submit();
});

backBtn.addEventListener('click', () => {
    form.action = '/user/login';
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

function check_ID(userID) {
    const warnID = document.getElementById("id-warn-span");
    confirmCheck.id = false;
    const idCheck = "id=" + userID;

    if(userID === ""){
        warnID.innerHTML = "필수 정보입니다";
    }
    else if(checkSpace.test(userID)){
        warnID.innerHTML = "공백을 제거해주세요";
    }
    else if(!checkID.test(userID)){
        warnID.innerHTML = "영어, 숫자만 입력 가능합니다";
    }
    else if(userID.length < 6 || userID.length > 12){
        warnID.innerHTML = "6 ~ 12자로 입력해주세요";
    }
    else{
        $.ajax({ // 아이디 중복 검사
            contentType:'application/json;charset=UTF-8',
            type: "POST",
            url: "/user/register/check",
            data: JSON.stringify(idCheck),
            dataType: "json",
            success: function (result) {
                if (result > 0) {
                    warnID.innerHTML = "이미 있는 닉네임 입니다"; }
                else{
                    warnID.innerHTML ="";
                    confirmCheck.id = true;
                }
            }
        });

    }
}

function check_password(userPW) {
    confirmCheck.pw = false;
    const warnPW = document.getElementById("pw-warn-span");
    if(userPW === ""){
        warnPW.innerHTML = "필수 정보입니다";
    }
    else if(!checkPW.test(userPW) || checkSpace.test(userPW)){
        warnPW.innerHTML = "띄어쓰기 없는 8~15자의 영문 대/소문자, 숫자 또는 특수문자 조합으로 입력하셔야 합니다.";
    }
    else{
        warnPW.innerHTML ="";
        confirmCheck.pw = true;
    }
}

function check_re_password(userPW_RE) {
    confirmCheck.pw_re = false;
    const warnPW_RE = document.getElementById("pw-re-warn-span");
    if(userPW_RE === ""){
        warnPW_RE.innerHTML = "필수 정보입니다";
    }
    else if(userPW.value !== userPW_RE){
        warnPW_RE.innerHTML ="비밀번호가 다릅니다";
    }
    else{
        warnPW_RE.innerHTML ="";
        confirmCheck.pw_re = true;
    }
}

function check_nick(userNick) {
    // 닉네임 검사
    confirmCheck.nick = false;
    const nickCheck = "nick=" + userNick;
    const warnNick = document.getElementById("nick-warn-span");
    if(userNick === ""){
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
                    warnNick.innerHTML = "이미 있는 아이디 입니다"; }
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
    if(userEmail === ""){
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
        case userID:
            check_ID(targetValue);
            break;
        case userPW:
            check_password(targetValue);
        case userPW_RE:
            check_re_password(targetValue);
            break;
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