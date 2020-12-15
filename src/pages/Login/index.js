import React, { useEffect, useState } from "react";
import { FormGroup, Button, TextField } from '@material-ui/core';
import { Container, Logo } from "./styles";
import TextFieldLogin from "../../Components/TextField";
import firebase from 'firebase';
import uuid from 'react-uuid';
import { encrypt } from "../../services/Crypt";
const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (event) => {
        event.preventDefault();
        const db = firebase.firestore();
        const key = uuid();
        db.collection('users').where("email", '==', email).get().then(co => {
            console.log("aqui")
            if (!co.empty) {
                co.forEach(function (doc) {
                    const pass = encrypt(password)
                    console.log(doc.data()['password'])
                    if (pass == doc.data()['password']) {
                        localStorage.setItem('TOKEN', doc.id);
                        console.log(localStorage.getItem('TOKEN'))
                        history.push('/')
                    } else {
                        alert("Senha não confere")
                    }
                });
            } else {
                alert("Nenhum cadastro encontrado")
            }

        }).catch(er => {
            alert("Não foi possivel logar")
        })
    }
    const register = () => {
        history.push('/register')
    }
    return (
        <Container>
            <FormGroup
                style={{
                    width: 300, height: 350,
                    background: '#021E19', padding: 10, alignItems: 'center'
                }}>
                <Logo src="https://www.xtree.com.vc/wp-content/themes/neori/xtree/images/xtree_logo_header.png" />
                <TextFieldLogin onChange={(text) => setEmail(text.target.value)}
                    value={email} id="standard-basic" label="Email" style={{ margin: 10, width: '80%' }} />
                <TextFieldLogin onChange={(text) => setPassword(text.target.value)}
                    value={password} id="standard-basic" label="Senha" type="password" style={{ margin: 10, width: '80%' }} />
                <Button onClick={submitLogin} type="button" color="primary" style={{ margin: 10 }}>
                    Login
                </Button>
                <Button onClick={register} type="button" color="secondary" style={{ margin: 10 }}>
                    Cadastrar
                </Button>
            </FormGroup>
        </Container>
    )
}

export default Login;