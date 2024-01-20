import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor={'title'}>title</label>
          <input
            id={'title'}
            value={title}
            onChange={({ target }) => {
              setTitle(target.value)
            }}
            placeholder='title'
          />
        </div>
        <div>
          <label htmlFor={'author'}>author</label>
          <input
            id={'author'}
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
            placeholder='author'
          />
        </div>
        <div>
          <label htmlFor={'url'}>url</label>
          <input
            id={'url'}
            value={url}
            onChange={({ target }) => {
              setUrl(target.value)
            }}
            placeholder='url'
          />
        </div>
        <button type={'submit'}>create</button>
      </form>
    </>
  )
}

export default BlogForm
