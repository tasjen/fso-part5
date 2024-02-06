import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

const Index = () => {
  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default Index;
