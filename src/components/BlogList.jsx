import Blog from "./Blog"

const BlogList = ({ blogs, handleRemoveBlog }) => (
  <div>
    {
      blogs.map(blog => <Blog key={blog.id} blog={blog} handleRemoveBlog={handleRemoveBlog} /> )
    }
  </div>  
)

export default BlogList