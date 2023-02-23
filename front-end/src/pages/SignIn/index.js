import { useState, useContext } from "react";
//import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/Auth";

import logo from "../../assets/images/logo.svg";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import {
  Row,
  Title,
  Label,
  Subtitle,
  Divider,
  Line,
} from "../../components/Auth";

import UserContext from "../../contexts/UserContext";

import useSignIn from "../../hooks/api/useSignIn";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loadingSignIn, signIn } = useSignIn();

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      //toast('Login realizado com sucesso!');
      navigate("/dashboard");
    } catch (err) {
      //toast('Não foi possível fazer o login!');
    }
  }

  return (
    <AuthLayout
      background={
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
      }
    >
      <Row>
        <Link to="/">
          <img src={logo} alt="Event Logo" width="60px" />
        </Link>
        <Title>{"Save Vale"}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input
            placeholder="E-mail"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            disabled={loadingSignIn}
          >
            Entrar
          </Button>
        </form>
      </Row>

      <Row>
        <Link to="/sign-up">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
