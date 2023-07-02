import "./Notification.css";

const Notification = ({ successText, errorText }) => {
  if (successText === null && errorText === null) {
    return null;
  } else if (successText != null) {
    return <div className="success">{successText}</div>;
  } else {
    return <div className="error">{errorText}</div>;
  }
};

export default Notification;
