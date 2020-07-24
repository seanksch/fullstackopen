import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification, SuccNotification } from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [errorMessage, setErrorMessage] = useState(null)
    const [succMessage, setSuccMessage] = useState(null)

    const blogFormRef = React.createRef()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setSuccMessage(`logged in as ${user.username}`)
            setTimeout(() => {
                setSuccMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <div>
            <h2>login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
          username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
          password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const blogForm = () => {

        const handleLogout = (event) => {
            event.preventDefault()
            console.log('logout')
            window.localStorage.removeItem('loggedBlogappUser')

            blogService.setToken('')
            setUser(null)
            setUsername('')
            setPassword('')
        }

        const addBlog = async (blogObject) => {
            console.log('create')

            // blogService
            //   .create(blogObject)
            //   .then(returnedBlog => {
            //     setBlogs(blogs.concat(returnedBlog))
            //     setBlogTitle('')
            //     setBlogAuthor('')
            //     setBlogUrl('')
            //   })

            blogFormRef.current.toggleVisibility()
            try {
                const returnedBlog = await blogService.create(blogObject)
                setBlogs(blogs.concat(returnedBlog))

                setSuccMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
                setTimeout(() => {
                    setSuccMessage(null)
                }, 5000)
            } catch (exception) {
                console.log('exception', exception)
                setErrorMessage('invalid blog input')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }

        }

        const updateBlogLikes = async (blogObject) => {
            console.log('update')

            const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
            // console.log(updatedBlog)

            try {
                const returnedBlog = await blogService.update(updatedBlog)
                // console.log(returnedBlog)
                setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : returnedBlog))
            } catch (exception) {
                console.log('exception', exception)
                setErrorMessage('invalid like')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        }

        const removeBlog = async (blogObject) => {
            console.log('remove')

            try {
                await blogService.remove(blogObject)
                // console.log(returnedBlog)
                setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
            } catch (exception) {
                console.log('exception', exception)
                setErrorMessage('invalid remove')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        }

        return (
            <div>
                <h2>blogs</h2>
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
                <h2>create new</h2>
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                </Togglable>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog} user={user} />
                )}
            </div>
        )
    }

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
            console.log('user', user)
        }
    }, [])

    return (
        <div>
            <Notification message={errorMessage} />
            <SuccNotification message={succMessage} />
            {user === null ?
                loginForm() :
                blogForm()
            }
        </div>
    )
}

export default App