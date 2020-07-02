const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

    const reducer = (favBlog, blog) => {
        return favBlog.likes < blog.likes
            ? blog
            : favBlog
    }

    return blogs.length === 0
        ? null
        : blogs.reduce(reducer, {likes: 0})
}

const averageLikes = (blogs) => {

    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0) / blogs.length
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}