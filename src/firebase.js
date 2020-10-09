import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyB0T7BrXG42ypxrGe4nexAaraaOwF_uE5U",
  authDomain: "blog-1f6cb.firebaseapp.com",
  databaseURL: "https://blog-1f6cb.firebaseio.com",
  projectId: "blog-1f6cb",
  storageBucket: "blog-1f6cb.appspot.com",
  messagingSenderId: "715983114150",
  appId: "1:715983114150:web:0e82b74dc0c5b03f920967",
  measurementId: "G-ZX29D4631Q"
};

class Firebase{
  constructor() {
    app.initializeApp(firebaseConfig);

    this.app = app.database()

    this.storage = app.storage()
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid

    return app.database().ref('usuarios').child(uid).set({
      nome: nome,
      email: email,
      password: password
    })
  }

  isInitialized() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve)
    })
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid() {
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  logout() {
    return app.auth().signOut()
  }

  async getUserName(callback){
    if(!app.auth().currentUser) {
      return null
    }

    const uid = app.auth().currentUser.uid
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback)
  }

}

export default new Firebase();