import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css'

class New extends Component {
  constructor(props){
    super(props)
    this.state = {
      titulo: '',
      image: null,
      url: '',
      descricao: '',
      alert: ''
    }

    this.cadastrar = this.cadastrar.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  componentDidMount() {
    if(!firebase.getCurrent()) {
      this.props.history.replace('/')
      return null
    }

  }

  cadastrar = async (e) => {
    e.preventDefault()

    if(this.state.titulo !== '' && 
        this.state.image !== '' && 
        this.state.descricao !== '' &&
        this.state.image !== null &&
        this.state.url !== ''
    ) {
      let posts = firebase.app.ref('posts')
      let chave = posts.push().key
      await posts.child(chave).set({
        titulo: this.state.titulo,
        image: this.state.url,
        descricao: this.state.descricao,
        autor: localStorage.nome,
        progress: 0
      })
      .then(() => {
        this.props.history.push('/dashboard')
      })
    } else {
      this.setState({alert: 'Preencha todos os campos!'})
    }
  }

  handleFile = async (e) => {
    const image = e.target.files[0]

    if(image) {
      if(image.type === 'image/png' || image.type === 'image/jpeg') {
        await this.setState({image: image})
        this.handleUpload()
      } else {
        alert('Envie uma imagem do tipo JPG ou PNG.')
        this.setState({image: null})
        return null
      }
    }

  }

  handleUpload = async () => {
    console.log(this.state.image)
    const { image } = this.state
    const currentUid = firebase.getCurrentUid()
    const uploadTaks = firebase.storage.ref(`images/${currentUid}/${image.name}`).put(image)

    await uploadTaks.on('state_changed', (snapshot) => {
      // progress
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      this.setState({progress})
    },
    (error) => {
      // error
      console.log('Error imagem: ' + error)
    }, 
    () => {
      // success
      firebase.storage.ref(`images/${currentUid}`)
        .child(image.name).getDownloadURL()
        .then(url => {
          this.setState({url: url})
        })
    })
  }


  render() {
    return (
      <div id="new-form">
        <form onSubmit={this.cadastrar} id="new-post">

          <span>{this.state.alert}</span>

          <input type="file" onChange={this.handleFile} /> <br />
          {this.state.url !== '' ?
            <img src={this.state.url} width="250" height="150" alt="Capa do post" />
            :
            <progress value={this.state.progress} max="100" />
          }

          <label>Titulo: </label>
          <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
           onChange={(e) => this.setState({titulo: e.target.value})} /> <br />

          <label>Descrição: </label>
          <textarea type="text" placeholder="Alguma descrição..." value={this.state.descricao}
           onChange={(e) => this.setState({descricao: e.target.value})} /> <br />

           <button type="submit">Cadastrar</button>

           <footer id="new">
            <Link to="/dashboard">Voltar</Link>
          </footer>
        </form>
      </div>
    )
  }
}

export default withRouter(New)