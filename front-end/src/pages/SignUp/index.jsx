import { useContext, useState } from 'react';
//import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import logo from "../../assets/images/logo.svg";
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label, Divider, Line, Subtitle, OAuthWrapper } from '../../components/Auth';
import Link from '../../components/Link';

import useSignUp from '../../hooks/api/useSignUp';
/* import OAuth from '../../components/Auth/OAuth';
import { facebookAuth, githubAuth, googleAuth } from '../../utils/authUtils'; */

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      //toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        //toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        //toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  return (
    <AuthLayout background={"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}>
      <Row>
        <img src={logo} alt="Event Logo" width="60px" />
        <Title>{"Save Vale"}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input placeholder="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Input placeholder="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>Inscrever</Button>
        </form>
      </Row>

      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
      </Row>
    </AuthLayout>
  );
}
