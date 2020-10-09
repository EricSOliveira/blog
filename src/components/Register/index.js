import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../../firebase';

import './register.css'
 
class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
          nome: '',
          email: '',
          password: '',
        }
        
        this.register = this.register.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    register(e) {
      e.preventDefault()
      this.onRegister()
    }

    onRegister = async () => {
      try {
        const { nome, email, password } = this.state

        await firebase.register(nome, email, password)
          .then(() => {
            this.props.history.replace('/dashboard');
          })
      } catch(error) {
        console.log(error.message)
        alert('Revise seu registro há campos vazio(s) ou inválido(s)!')
      }
    }
 


    render(){
        return(
        <div className="form-register">
          <h1 className="register-h1">Novo Usuário</h1>
            <form onSubmit={this.register} id='register'>
              
                <label>Nome:</label><br/>
                <input type="text" autoFocus
                autoComplete='off' value={this.state.nome} 
                onChange={(e) => {this.setState({nome: e.target.value})}}/><br/>

                <label>E-mail:</label><br/>
                <input type="email" placeholder="exemplo@exemplo.com" 
                autoComplete='off' value={this.state.email} 
                onChange={(e) => {this.setState({email: e.target.value})}}/><br/>

                <label>Senha:</label><br/>
                <input type="password" autoComplete="off" value={this.state.password}
                onChange={(e) => {this.setState({password: e.target.value})}} /><br/>

                <button type="submit">Cadastrar</button><br/>
            </form>
        </div>
        )
    }
}
 
export default withRouter(Register)