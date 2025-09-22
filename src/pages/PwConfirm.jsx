import LoginModal from '../components/ui/LoginModal';
import { LoginInput } from '../components/ui/LoginInput';
import { useState } from 'react';
import LoginButton from '../components/ui/LoginButtons';
import { useNavigate } from 'react-router-dom';
import { newError } from '../utils/validate';
import Button from '../components/ui/Button';

export function PwConfirm() {
  const navigate = useNavigate();
  const openModal = true;
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirm: false,
  });

  const [isPopup, setIsPopup] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      confirm: true,
    });
  }

  const errors = newError(form);

  const users = [{ email: 'test@gmail.com' }, { email: 'test1@gmail.com' }];

  function emailConfirm(email) {
    const value = String(email || '')
      .trim()
      .toLowerCase();

    if (!value) {
      setPopupMessage('이메일을 입력하세요.');
      setIsInput(true);
      return;
    }

    const confirm = users.some((user) => (user.email || '').toLowerCase() === value);
    if (confirm) {
      setPopupMessage('확인되었습니다.');
      setIsInput(true);
    } else {
      setPopupMessage('존재하지 않는 이메일입니다.');
    }
    setIsPopup(true);
  }

  const forms = form.password.length && form.confirm.length;
  const noError = !errors.password && !errors.confirm;
  const onButton = noError && forms;

  const footer = () => {
    return (
      <div className="flex flex-col buttons w-full gap-2 pt-6">
        <LoginButton
          type="submit"
          variant={onButton ? 'common' : 'cancle'}
          size="md"
          form="pwConfirmForm"
          disabled={!onButton}
        >
          변경하기
        </LoginButton>
        <div>
          비밀번호 생각났어요!{' '}
          <button onClick={() => navigate('/')} type="button" className="text-[#3058bd] font-bold">
            돌아가기
          </button>
        </div>
      </div>
    );
  };

  const emailfooter = () => {
    return (
      <div className="mt-6">
        <Button variant="common" size="md" onClick={() => setIsPopup(false)}>
          닫기
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="h-16 bg-slate-900 text-white flex items-center px-6">
        <h1 className="text-lg font-medium"></h1>
      </header>
      <main className="flex-1 bg-slate-100 p-4">
        <div className="h-full grid grid-cols-[3fr_1fr] gap-4">
          <div className="grid grid-rows-[1fr_2fr] gap-4">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <span className="text-lg font-medium text-slate-700"></span>
              </div>
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <span className="text-lg font-medium text-slate-700"></span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 flex items-center justify-center">
              <span className="text-xl font-medium text-slate-700"></span>
            </div>
          </div>
          <div className="bg-blue-600 rounded-lg p-6 flex items-center justify-center">
            <span className="text-lg font-medium text-white"></span>
          </div>
        </div>
      </main>

      <LoginModal openModal={openModal} title={'비밀번호 찾기'} footer={footer()}>
        <form id="pwConfirmForm" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            <LoginInput
              label={'이메일'}
              type={'email'}
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={(e) => {
                setForm((email) => ({ ...email, email: e.target.value }));
              }} //state 업데이트
              onBlur={() => setTouched((t) => ({ ...t, email: true }))} //유효성검사 메세지 출력
              error={touched.email ? errors.email : ''}
            ></LoginInput>
            <button
              type="button"
              className="flex justify-center items-center w-auto h-[35px] border-[1px]
                rounded-[5px] p-[2px] border-gray-400 bg-gray-200 hover:bg-gray-400 pr-1 pl-1"
              onClick={() => emailConfirm(form.email)}
            >
              이메일 확인
            </button>
          </div>
          <LoginInput
            label={'비밀번호'}
            type={'password'}
            placeholder="비밀번호 입력"
            value={form.password}
            disabled={!isInput}
            onChange={(e) => {
              const next = e.target.value;
              setForm((password) => ({ ...password, password: next }));
              setTouched((t) => ({ ...t, password: true }));
            }}
            error={touched.password ? errors.password : ''}
          ></LoginInput>
          <LoginInput
            label={'비밀번호 확인'}
            type={'password'}
            placeholder="비밀번호 입력 확인"
            value={form.confirm}
            disabled={!isInput}
            onChange={(e) => {
              const next = e.target.value;
              setForm((confirm) => ({ ...confirm, confirm: next }));
              setTouched((t) => ({ ...t, confirm: true }));
            }}
            error={touched.confirm ? errors.confirm : ''}
          ></LoginInput>
        </form>
      </LoginModal>

      <LoginModal
        title={'이메일 확인'}
        openModal={isPopup}
        footer={emailfooter()}
        onClose={() => setIsPopup(false)}
      >
        {popupMessage}
      </LoginModal>
    </div>
  );
}
