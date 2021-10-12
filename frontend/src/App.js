import React from 'react';
import './App.css';
import { Button } from './Button';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        todoList:[],
        activeItem:{
          id:null,
          title:'',
          completed:false,
        },
        editing:false,
      }
      this.fetchTasks = this.fetchTasks.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)
      this.startEdit = this.startEdit.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
      this.strikeUnstrike = this.strikeUnstrike.bind(this)
      // this.fetchTasks()
    }

    componentDidMount(){
      this.fetchTasks()
    }
    
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
    }

  fetchTasks(){
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/tasks/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        todoList:data
      })
      )
  }

  handleChange(e){
    // var name = e.target.name
    var value = e.target.value
    // console.log('Name:', name)
    // console.log('Value:', value)

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    // console.log('ITEM:', this.state.activeItem)

    var url = 'http://localhost:8000/api/tasks/'
    var csrftoken = this.getCookie('csrftoken')

    if (this.state.editing === true) {
      url = this.state.activeItem.url
      // console.log('Item:', this.state.activeItem)
    }

    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem:{
          id:null,
          title:'',
          completed:false,
        }
      })
    }).catch(function(error){
      console.log('Error:', error)
    })
  }

  startEdit(task) {
    this.setState({
      activeItem:task,
      editing:true
    })
  }

  deleteItem(task){
    var csrftoken = this.getCookie('csrftoken')
    fetch(task.url, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      }
    }).then((response) => {
      this.fetchTasks()
    })
  }

  strikeUnstrike(task){
    task.completed = !task.completed
    // console.log('TASK:', task.completed)
    var csrftoken = this.getCookie('csrftoken')
    fetch(task.url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify({'completed': task.completed, 'title': task.title})
    }).then((response) => {
      this.fetchTasks()
    })
  }

  render() {
    var tasks = this.state.todoList
    var self = this
    return (
      <div className="container">
        <div className="mx-auto shadow-xl my-4 bg-white justify-around items-start max-w-screen-sm">
          <div className="sticky top-0 border-b border-black shadow-md p-16 bg-white">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex">
                <div style={{flex: 6}}>
                  <input onChange={this.handleChange} className="w-full border rounded my-1 mx-0.5 py-1.5 px-3" id="title" type="text" name="title" placeholder="Add Task..." value={this.state.activeItem.title} />
                </div>
                <div className="flex-1">
                  {/* <input id="submit" className="my-1 mx-0.5 inline-block text-white bg-green-600 text-center border rounded py-1.5 px-3 border-white" type="submit" name="Add" /> */}
                  <Button name="submit" type="submit" text="Submit" />
                </div>
              </div>
            </form>
          </div>
          <div>
            {tasks.map(function(task, index){
              return(
                <div key={index} className="border-b border-black m-2 p-8 flex">
                  <div onClick={() => self.strikeUnstrike(task)} style={{flex: 7}}>
                    {task.completed === false ?(
                      <span>{task.title}</span>
                    ) : (
                      <strike>{task.title}</strike>
                    )}
                  </div>

                  <div className="flex-1">
                    <Button onClick={() => self.startEdit(task)} text="Edit" />
                  </div>

                  <div className="flex-1">
                    <Button text="Delete" onClick={() => self.deleteItem(task)} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
