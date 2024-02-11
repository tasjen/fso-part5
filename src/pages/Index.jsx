import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

const Index = () => {
  return (
    <div className="m-4 space-y-4">
      <p className="text-2xl">Blogs</p>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default Index;
