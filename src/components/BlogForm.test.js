import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('form calls the event in the props with the right details when submitted', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();

    render(<BlogForm addBlog={mockHandler} />);

    const titleInput = screen.getByPlaceholderText('title');
    const authorInput = screen.getByPlaceholderText('author');
    const urlInput = screen.getByPlaceholderText('url');
    const createButton = screen.getByText('create');

    await user.type(titleInput, 'TITLE');
    await user.type(authorInput, 'AUTHOR');
    await user.type(urlInput, 'URL');
    await user.click(createButton);

    expect(mockHandler.mock.calls[0][0].title).toBe('TITLE');
    expect(mockHandler.mock.calls[0][0].author).toBe('AUTHOR');
    expect(mockHandler.mock.calls[0][0].url).toBe('URL');
  });
});
