import React from 'react';
import './App.css';

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
  }

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')
  }

  render() {
    return (
      <div className="container">
        <div className="mx-auto shadow-xl my-4 bg-white justify-around items-start max-w-screen-sm">
          <div className="sticky top-0 border-b border-black shadow-md p-16">
            <form id="form">
              <div className="flex">
                <div style={{flex: 6}}>
                  <input className="w-full border rounded my-1 mx-0.5 py-1.5 px-3" id="title" type="text" name="title" placeholder="Add Task..." />
                </div>
                <div className="flex-1">
                  <input id="submit" className="my-1 mx-0.5 inline-block text-white bg-green-600 text-center border rounded py-1.5 px-3 border-white" type="submit" name="Add" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
