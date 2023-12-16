import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Form from './components/Form'
import Post from './components/Post'

const urlBaseServer = 'http://localhost:3000'

const App = () => {
  const [titulo, setTitulo] = useState('')
  const [imgSrc, setImgSRC] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const { data: posts } = await axios.get(`${urlBaseServer}/posts`)
    setPosts([...posts])
  }

  const agregarPost = async () => {
    const post = { titulo, url: imgSrc, descripcion }
    await axios.post(`${urlBaseServer}/posts`, post)
    getPosts()
  }

  const like = async (id) => {
    await axios.put(`${urlBaseServer}/posts/like/${id}`)
    getPosts()
  }

  const eliminarPost = async (id) => {
    await axios.delete(`${urlBaseServer}/posts/${id}`)
    getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='App'>
      <h2 className='py-5 text-center'>Agregar Productos</h2>
      <div className='row m-auto px-5'>
        <div className='col-12 col-sm-4'>
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className='col-12 col-sm-8 px-5 row posts align-items-start'>
          {posts.map((post) => <Post key={post} post={post} like={like} eliminarPost={eliminarPost} />)}
        </div>
      </div>
    </div>
  )
}

export default App
