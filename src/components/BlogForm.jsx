import React from "react"
import { useState } from "react"

const BlogForm = ({ handleBlogSave }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    handleBlogSave({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title-input'>title: </label>
          <input id='title-input'
                 type='text' 
                 value={title}
                 onChange={handleTitleChange}
          ></input>
        </div>
        <div>
          <label htmlFor='author-input'>author: </label>
          <input id='author-input'
                 type='text'
                 value={author}
                 onChange={handleAuthorChange}
          ></input>
        </div>
        <div>
          <label htmlFor='url-input'>url: </label>
          <input id='url-input'
                 type='text'
                 value={url}
                 onChange={handleUrlChange}
          ></input>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm