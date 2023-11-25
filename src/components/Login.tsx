import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length > 6;

    if (isEmailValid && isPasswordValid) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // salva email no localStorage na chave 'user' no formato { email: email-da-pessoa }
    localStorage.setItem('user', JSON.stringify({ email }));
    // redirecionar para a rota /meals
    navigate('/meals');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmailChange }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePasswordChange }
        />
        <button data-testid="login-submit-btn" disabled={ isButtonDisabled }>
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
