import React, { Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './edit.css';

class Edit extends Component {

  constructor(props){
    super(props)

    this.state = {
      posts: []
    }

    this.deletar = this.deletar.bind(this)
  }

  deletar = async (e) => {
    e.preventDefault()

    let key = e.target.value
    await firebase.app.ref('posts').child(key).remove()

    alert('Post removido!')

  }


  componentDidMount() {
    firebase.app.ref('posts').on('value', (snapshot) => {
      let state = this.state;
      state.posts = [];

      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          image: childItem.val().image,
          descricao: childItem.val().descricao,
          autor: childItem.val().autor,
        })
      })
      state.posts.reverse()
      this.setState(state)
    })
  }


  render(){
    return (
      <section id="post">
        {this.state.posts.map((post) => {
         
          return (
            post.autor === localStorage.nome ?

            <article key={post.key}>
              <header>
                <div className="title">
                  <strong>{post.titulo}</strong>
                  <span>Autor: {post.autor}</span>
                </div>
                <div className="delete">
                  <button value={post.key} onClick={this.deletar}>Deletar</button>
                </div>
              </header>
              {/* {console.log(post.image)} */}
              <img src={post.image} alt="Capa do post" />
              <footer>
                <p>{post.descricao}</p>
              </footer>
            </article>

            :

            ""
            
          )
        })}
      </section>
    );
  }
}

export default withRouter(Edit);
