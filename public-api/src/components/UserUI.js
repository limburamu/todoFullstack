import React from 'react'
import '../style/UserUIStyles.css'

const UserUI = () => {
  return (
    <div>
        <form>
            <input type="text" placeholder="Add Todo Item" />
            <button type="submit">Add</button>
        </form>
        <div className=''>

        </div>
    </div>
  )
}

export default UserUI