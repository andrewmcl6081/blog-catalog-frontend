
const UserStatus = ({ user, handleLogout }) => {
  return (
    <div>
      <label htmlFor='logout-button'>{user.name} logged in </label>
      <button id='logout-button' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserStatus