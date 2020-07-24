import React, { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, removeBlog, user }) => {

  const [hide, setHide] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setHide(!hide)}>{hide ? 'view' : 'hide'}</button>
      <div style={{ display: hide ? 'none' : '' }} className='blogDetailContent'>
        <BlogDetails blog={blog} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog} user={user} />        
      </div>
    </div>
  )
}

const BlogDetails = ({ blog, updateBlogLikes, removeBlog, user }) => {

  const handleLike = () => {
    updateBlogLikes(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog)
    }    
  }

  return (
    <div>
      {blog.url}<br />
      likes {blog.likes} <button onClick={handleLike}>like</button> <br />
      {blog.user?.name}
      <div style={{ display: user?.username !== blog.user?.username ? 'none' : '' }}><button onClick={handleRemove}>remove</button></div>
    </div>
  )
}

export default Blog
