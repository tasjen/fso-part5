const LoginForm = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleLogIn,
}) => {
  return (
    <form onSubmit={handleLogIn}>
      <h1>log in to application</h1>
      <div>
        <label htmlFor={'username'}>username</label>
        <input id={'username'}
          value={username}
          onChange={handleUsername} />
      </div>
      <div>
        <label htmlFor={'password'}>password</label>
        <input
          id={'password'}
          type={'password'}
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button type={'submit'}>login</button>
    </form>
  );
};

export default LoginForm;
