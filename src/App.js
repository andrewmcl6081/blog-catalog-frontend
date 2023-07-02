import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
//import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserStatus from './components/UserStatus'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.logUserIn({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogSave = async (newBlogObj) => {
    blogFormRef.current.toggleVisibility()

    try {
      const savedNewBlog = await blogService.create(newBlogObj)
      setBlogs(blogs.concat(savedNewBlog))
    }
    catch (exception) {
      console.log(exception.response.data)
    }
  }

  const handleRemoveBlog = (id) => {
    setBlogs(blogs.filter(blog => id !== blog.id))
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h1>Blogs</h1>

      {/* When a user is not logged in */}
      {!user &&
        <Togglable buttonLabel='login'>
          <LoginForm handleUsernameChange={handleUsernameChange}
                     handlePasswordChange={handlePasswordChange}
                     handleLogin={handleLogin}
                     username={username}
                     password={password}
           />
        </Togglable>
      }

      {/* When a user is logged in */}
      {user &&
        <div>
          <UserStatus user={user} handleLogout={handleLogout} />
          <hr />
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm handleBlogSave={handleBlogSave} />
          </Togglable>
          <BlogList blogs={blogs} handleRemoveBlog={handleRemoveBlog}/>
        </div>
      }
    </div>
  )
}

export default App