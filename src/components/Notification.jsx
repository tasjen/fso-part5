const Notification = ({ notification: { text, error } }) => {
  if (text === '') {
    return <></>
  }

  return <div className={error ? 'error' : 'message'}>{text}</div>
}

export default Notification
