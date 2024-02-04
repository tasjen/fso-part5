import Togglable from './Togglable';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Index = () => {
  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default Index;
