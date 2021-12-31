import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {

    const navigate = useNavigate();
    const [taskInput, setTask] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorInput, setError] = useState([]);
    const {id} = useParams();
    const handleInput = (e) => {
        return setTask({...taskInput, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        const task_id = id;
        axios.get(`api/edittask/${task_id}`).then(res => {
                if(res.data.status === 200){
                    setTask(res.data.task);
                    setLoading(false);
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/tasks');
                }
            })
        
    }, [navigate, id]);

    const updateTask = (e) => {
        e.preventDefault();
        const data = {
            todo:taskInput.todo,
            thought:taskInput.thought,
            deadline:taskInput.deadline
        }
        axios.put(`api/updatetask/${id}`,data).then(
            res => {
                if(res.data.status === 200){
                    swal('Success!', res.data.message);
                    setError([]);
                    navigate('/tasks')
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    navigate('/tasks');
                }
                else if(res.data.status === 422) {
                    swal('All fields are mandatory!', '');
                    setError(res.data.validationErrors);
                }
            })
    };
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

   

    return (
        <div class="container contact">
	    <div class="row">
		    <div class="col-md-3">
			    <div class="contact-info">
				    <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
				    <h2>My Journal</h2>
				    <h6>Update?</h6>
			    </div>
		    </div>
		    <div class="col-md-9">
            <form onSubmit={updateTask} class="contact-form">
				    <div class="form-group">
				        <label class="control-label col-sm-2" for="fname">To Do</label>
				        <div class="col-sm-10">          
					        <input type="text" class="form-control" id="fname" placeholder="What to do?" name='todo' onChange={handleInput} placeholder="What to do?" value={taskInput.todo}/>
                            <span className='text-danger'>{errorInput.todo}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-sm-2" for="lname">Deadline:</label>
				        <div class="col-sm-10">          
				        	<input type="date" class="form-control" id="lname" placeholder="come end" name='deadline' onChange={handleInput} value={taskInput.deadline} min={date} max="2025-01-01"/>
                            <span className='text-danger'>{errorInput.thought}</span>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label class="control-label col-sm-2" for="comment">Thought:</label>
				        <div class="col-sm-10">
					        <textarea class="form-control" rows="5" id="comment" placeholder="Any thoughts?" name='thought' onChange={handleInput} value={taskInput.thought}/>
                            <span className='text-danger'>{errorInput.deadline}</span>   
				        </div>
				    </div>
				    <div class="form-group">        
				        <div class="col-sm-offset-2 col-sm-10 mt-4">
                        <button type='submit' class='btn btn-default' id="add">Update Task</button>
			    	    </div>
			    	</div>
			    </form>
            </div>
	    </div>
    </div>
    //     <div>
    //         <div className='container'>
    //             </div>
    //             <div className="card">
    //                 <div className="card-header">
    //                 <h4>Edit Task
    //                 <Link to = {"/tasks"} className='btn btn-sm float-end'>BACK</Link>
    //                 </h4>
    //                 </div>
    //             <div className="card-body">
    //                 <form action="" onSubmit={updateTask}>
    //                     <div className='form-group mb-3'>
    //                         <label htmlFor="todo">Todo</label>
    //                         <input className='form-control' type="text" name="todo" onChange={handleInput} value={taskInput.todo}/>
    //                         <span className='text-danger'>{errorInput.todo} </span>
    //                     </div>
    //                     <div className='form-group mb-3'>
    //                         <label htmlFor="thought">Thought</label>
    //                         <input className='form-control' type="text" name="thought" onChange={handleInput} value={taskInput.thought}/>
    //                         <span className='text-danger'>{errorInput.thought} </span>
    //                     </div>
    //                     <div className='form-group mb-3'>
    //                         <label htmlFor="deadline">Deadline</label>
    //                         <input className='form-control' type="date" name="deadline" onChange={handleInput} value={taskInput.deadline}/>
    //                         <span className='text-danger'>{errorInput.deadline} </span>
    //                     </div>
    //                     <button type="submit" className='btn btn-primary'>Update Task</button>
    //                 </form>
    //   </div>
    //     </div>
    //     </div>
    )
};

export default EditTask