import { useContext } from 'react';
import { VisibleContext } from './Togglable';
import { useBlogsMutation, useInput } from '../hooks';

const BlogForm = () => {
  const title = useInput('text');
  const author = useInput('text');
  const url = useInput('text');
  const { toggleVisible } = useContext(VisibleContext);
  const { addBlog } = useBlogsMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    await toggleVisible();
    resetAllForms();
  };

  const resetAllForms = () => {
    title.onReset();
    author.onReset();
    url.onReset();
  };

  return (
    <div>
      <h2 className="font-bold my-2">Create new</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex max-w-xs">
          <label htmlFor="title" className="mr-auto">
            Title:
          </label>
          <input
            id="title"
            {...title}
            placeholder="title"
            className="rounded-s"
          />
        </div>
        <div className="flex max-w-xs">
          <label htmlFor="author" className="mr-auto">
            Author:
          </label>
          <input
            id="author"
            {...author}
            placeholder="author"
            className="rounded-s"
          />
        </div>
        <div className="flex max-w-xs">
          <label htmlFor="url" className="mr-auto">
            URL:
          </label>
          <input id="url" {...url} placeholder="url" className="rounded-s" />
        </div>
        <div className="flex justify-around max-w-xs">
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-400 text-gray-100 font-bold py-2 px-4 rounded"
          >
            create
          </button>
          <button
            onClick={toggleVisible}
            className="bg-gray-500 hover:bg-gray-400 text-gray-100 font-bold py-2 px-4 rounded"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
