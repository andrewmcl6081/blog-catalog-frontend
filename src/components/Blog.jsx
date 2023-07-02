import { useState, Fragment } from 'react'
import blogService from '../services/blogs'
import './Blog.css'

const Blog = ({ blog: { title, author, url, likes, id, user }, handleRemoveBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [likesValue, setLikesValue] = useState(likes)

  const handleLikeButtonClick = async () => {
    setLikesValue(likesValue + 1)

    const newBlog = {
      user: user.id,
      likes: likesValue + 1,
      author: author,
      title: title,
      url: url
    }

    // Sending with id of blog and the newBlog object
    try {
      await blogService.update(id, newBlog)
    }
    catch (exception) {
      console.log('exception occured: ', exception.response.data)
    }
  }

  const handleRemoveClick = async () => {
    const choice = window.confirm(`Remove blog '${title} by ${author}'`)

    if (choice) {
      try {
        await blogService.remove(id)
        handleRemoveBlog(id)
      }
      catch (exception) {
        console.log('exception occurred: ', exception.response.data)
      }
    }
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Fragment>
      {isExpanded ?
        (
          <div className='blog-list'>
            {`${title} ${author} `}<button onClick={handleToggle}>Hide</button>
            <br/>
            {url}
            <br/>
            {`likes ${likesValue} `}<button onClick={handleLikeButtonClick}>like</button>
            <br/>
            {user.name}
            <br/>
            <button className='delete-btn' onClick={handleRemoveClick}>remove</button>
          </div>
        ) : (
          <div className='blog-list'>
            {`${title} ${author} `}
            <button onClick={handleToggle}>View</button>
          </div>
        )
      }
    </Fragment>
  )
}

export default Blog