import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let mockHandler

    beforeEach(() => {
        const blog = {
            title: 'how to eat',
            author: 'minkang',
            url: 'http',
            likes: 10
        }

        mockHandler = jest.fn()

        component = render(
            <Blog blog={blog} updateBlogLikes={mockHandler} />
        )
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent(
            'how to eat'
        )
        expect(component.container).toHaveTextContent(
            'minkang'
        )
    })

    test('at start the details are not displayed', () => {
        const div = component.container.querySelector('.blogDetailContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, details are displayed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.blogDetailContent')
        expect(div).not.toHaveStyle('display: none')

        expect(component.container).toHaveTextContent(
            'http'
        )
        expect(component.container).toHaveTextContent(
            '10'
        )
    })

    test('like button called twice', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})
