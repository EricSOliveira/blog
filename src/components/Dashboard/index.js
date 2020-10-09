import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nome: localStorage.nome
    }

    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    if(!firebase.getCurrent()) {
      this.props.history.replace('/login')
      return null
    }

    firebase.getUserName((info) => {
      localStorage.nome = info.val().nome
      this.setState({
        nome: localStorage.nome
      })
    })
  }

  logout = async () => {
    await firebase.logout()
    .then(() => {
      this.props.history.push('/')
      localStorage.removeItem("nome")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  render() {
    return(
      <div id="dash-center">
        <div id="dashboard">
          <div className="user-info">
            <h1>Olá {this.state.nome}!</h1>
            <Link to="/dashboard/new">Novo Post</Link>
            <Link to="/dashboard/edit">Deletar Post</Link>
          </div>

          <div className="user-logout">
            <p>Logado com {firebase.getCurrent()}</p>
            <button onClick={this.logout}>Deslogar</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard)