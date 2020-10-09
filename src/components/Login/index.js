import React, {Component} from 'react';
import {Link , withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';
 
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        
        this.entrar = this.entrar.bind(this)
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        // Verificar usuário logado
        if(firebase.getCurrent()) {
            return this.props.history.replace('dashboard')
        }
    }
 
    entrar(e){
        e.preventDefault()
        console.log('ativou entrar')
        this.login()
    }
 
    login = async () => {
        const {email, password} = this.state;
        console.log('ativou login')
        
        try{
            
            await firebase.login(email, password)
            .then(() => { this.props.history.replace('/dashboard') })
            .catch((error) => {
                if (error.code === 'auth/user-not-found'){
                    alert('Usuário não existe')
                }
                else if (error.code === 'auth/invalid-email'){
                    alert('O e-mail ou senha é inválido!')
                } 
                else {
                    alert('Código de erro:' + error.code)
                    return null;
                }
            })            
        }catch(error){
            alert(error.message);
        }
    }

 


    render(){
        return(
        <div className="form-login">
            <form onSubmit={this.entrar} id='login'>
                <label>E-mail:</label><br/>
                <input type="email"  autoFocus placeholder="Endereço de e-mail" 
                autoComplete='off' value={this.state.email} 
                onChange={(e) => {this.setState({email: e.target.value})}}/><br/>
                <label>Senha:</label><br/>
                <input type="password" autoComplete="off" value={this.state.password} placeholder="Senha" 
                onChange={(e) => {this.setState({password: e.target.value})}} /><br/>
                <button type="submit">Entrar</button><br/>
                <Link to='/register'>Ainda não tem cadastro?</Link>
            </form>
        </div>
        )
    }
}
 
export default withRouter(Login)