import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const res = await api.post('sessions', { email });

      localStorage.setItem('ongId',res.data.id)
      localStorage.setItem('ongName',res.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.')
    }

  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua Email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color='#E02141' /> Não tenho cadastro
          </Link>
        </form>

      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}