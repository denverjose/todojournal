import React, {useState} from 'react';
import './table.css';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';



const AddTask = () => {
    const history = useNavigate();
    const [taskInput, setTask] = useState({
        todo: "",
        thought: "",
        deadline: "",
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setTask({...taskInput, [e.target.name]: e.target.value});
    };
    const saveTask = (e) => {
        e.preventDefault();
        const data = {
            todo: taskInput.todo,
            thought: taskInput.thought,
            deadline: taskInput.deadline
        }

        axios.post(`api/addtask`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success!", res.data.message, "Success");
                setTask({
                    todo: "",
                    thought: "",
                    deadline: "",
                    error_list: [],
                });
                history("/tasks");

                
            }
            else if (res.data.status === 422) {
                setTask({...taskInput, error_list: res.data.validate_err})
            }
        })
    };

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    
    return (
    <div class="container contact">
	    <div class="row mx-3">
		    <div class="col-md-3">
			    <div class="contact-info">
				    <img class="img-fluid" src="https://cdn-icons-png.flaticon.com/512/2387/2387635.png" alt="image"/>
				    <h4>You gon do somethin'? If none, then do somethin'.</h4>
			    </div>
		    </div>
		    <div class="col-md-9">
            <form class="contact-form" onSubmit={saveTask}>
				    <div class="form-group">
				        <label class="control-label col-12" for="fname">To Do</label>
				        <div class="col-sm-12">          
					        <input type="text" class="form-control" id="fname" placeholder="What to do?" name='todo' onChange={handleInput} placeholder="What to do?" value={taskInput.todo}/>
                            <span className='text-danger'>{taskInput.error_list.todo}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-12" for="lname">Deadline:</label>
				        <div class="col-sm-12">          
				        	<input type="date" class="form-control" id="lname" placeholder="come end" name='deadline' onChange={handleInput} value={taskInput.deadline} min={date} max="2025-01-01"/>
                            <span className='text-danger'>{taskInput.error_list.deadline}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-12" for="comment">Thought:</label>
				        <div class="col-sm-12">
					        <textarea class="form-control" rows="5" id="comment" placeholder="Any thoughts?" name='thought' onChange={handleInput} value={taskInput.thought}/>
                            <span className='text-danger'>{taskInput.error_list.thought}</span>   
				        </div>
				    </div>
				    <div class="form-group">        
				        <div class="col-sm-offset-2 col-sm-12 mt-4">
                        <button type='submit' class='btn btn-default' id="add" >Add Task</button>
			    	    </div>
			    	</div>
			    </form>
            </div>
	    </div>
    </div>
    )
}

export default AddTask