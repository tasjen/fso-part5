import { useState, useEffect, useRef, useContext } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import NotificationContext from './context/NotificationContext'
import UserContext from './context/UserContext'
import LogInForm from './components/LogInForm'
import LogOutButton from './components/LogOutButton'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useContext(UserContext)
  const [notification, showNotification] = useContext(NotificationContext)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))

    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs([...blogs, newBlog])
      showNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        error: false,
      })
      blogFormRef.current.toggleVisible()
    } catch (err) {
      showNotification({ text: err.message, error: true })
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map((e) => (e.id !== updatedBlog.id ? e : updatedBlog)))
    } catch (err) {
      showNotification({ text: err.message, error: true })
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      if (confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.remove(blogObject)
        setBlogs(blogs.filter((e) => e.id !== blogObject.id))
      }
    } catch (err) {
      showNotification({ text: err.message, error: true })
    }
  }

  if (user === null) {
    return <LogInForm />
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <LogOutButton />
      </div>
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          ))}
      </ul>
    </>
  )
}

export default App
