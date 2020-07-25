import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
        })
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    type="text"
                    id="add-blog-title"
                    value={blogTitle}
                    name="BlogTitle"
                    onChange={({ target }) => setBlogTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    id="add-blog-author"
                    value={blogAuthor}
                    name="BlogAuthor"
                    onChange={({ target }) => setBlogAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    id="add-blog-url"
                    value={blogUrl}
                    name="BlogUrl"
                    onChange={({ target }) => setBlogUrl(target.value)}
                />
            </div>
            <button id="add-blog-button" type="submit">create</button>
        </form>
    )
}

export default BlogForm