import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputBlogTitle = component.container.querySelector('input[name=BlogTitle]')
  const form = component.container.querySelector('form')

  fireEvent.change(inputBlogTitle, { 
    target: { value: 'how to eat effectively' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
//   console.log(createBlog.mock.calls)
//   console.log(createBlog.mock.calls[0][0])
//   expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
  expect(createBlog.mock.calls[0][0]['title']).toBe('how to eat effectively')
})