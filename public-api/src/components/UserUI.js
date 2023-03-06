import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../style/UserUIStyles.css'

const UserUI = () => {
  const [itemText, setItemText] = useState('');
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');
    const [updateItemText, setUpdateItemText] = useState('');


  //add new Todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5500/api/item', { item: itemText })
        setListItems(prev => [...prev, res.data]);
        setItemText('');
    } catch (err) {
        console.log(err);
    }
}


useEffect(() => {
  const getItemsList = async () => {
      try {
          const res = await axios.get('http://localhost:5500/api/items');
          setListItems(res.data);
          console.log('render')
      } catch (err) {
          console.log(err);
      }
  }
  getItemsList()
}, []);


const deleteItem = async (id) => {
  try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
  } catch (err) {
      console.log(err);
  }
}


const cancelUpdate = () => {
  setIsUpdating('');
}


const updateItem = async (e) => {
  e.preventDefault()
  try {
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, { item: updateItemText })
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText
      setUpdateItemText('');
      setIsUpdating('');
  } catch (err) {
      console.log(err);
  }
}


const renderUpdateForm = (item) => {
  console.log(item);


  return (
    <div>
       <form className="update-form" onSubmit={(e) => { updateItem(e) }}>
                <input className="update-new-input" type="text" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
                <button className="update-new-btn" type="submit">Save</button>
                <button className="cancel" onClick={cancelUpdate}>Cancel</button>
            </form>
    </div>
  )
  }

  const getItemClass = (done) => {
    if (done == true) {
        return 'task-done'
    }
}

return (
  <div className='nav' >
      <h1>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
          <input type="text" placeholder="Add Todo Item" onChange={e => { setItemText(e.target.value) }} value={itemText} />
          <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
          {
              listItems.map(item => (
                  <div className="todo-item">
                      <input value={item.item} type='checkbox' className='checkbox' />
                      {
                          isUpdating === item._id
                              ? renderUpdateForm(item)
                              : <>
                                  <p className={getItemClass(item.done)}>{item.item}</p>
                                  <button className="update-item" onClick={() => { setUpdateItemText(item.item); setIsUpdating(item._id) }} value={isUpdating}>Update</button>
                                  <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                              </>
                      }
                  </div>
              )
              )
          }

</div>
        </div>
    )
}

export default UserUI