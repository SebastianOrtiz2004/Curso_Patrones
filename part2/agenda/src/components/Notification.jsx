const Notification = ({ message, isError }) => {
  if (!message) return null;

  const notificationStyle = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: isError ? '#f44336' : '#4CAF50',
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
}

export default Notification;