import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';



import { Link } from 'react-router-dom';

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get(`api/tasks`).then(res=> {
            if(res['status']===200) {
                setTasks(res.data.tasks);
                setLoading(false);
            }
        })
    }, []); 
    // delete function
    const deleteTask = (e,id) => {
        e.preventDefault();
        const delClick = e.currentTarget;
        axios.delete(`api/deletetask/${id}`).then(
            res => {
                if(res.data.status === 200){
                    swal('Deleted!', res.data.message);
                    delClick.closest('tr').remove();
                }
                else if(res.data.status === 404) {
                    swal(`error`, res.data.message);
                    delClick.innerText = 'Delete'
                };
            }
        );
    }
    if (loading) {
        return <h4 style={{color:'white',margin:'400px'}}>Loading Task Data</h4>
    }
    else {
        var task_HTMLTABLE="";
        task_HTMLTABLE = tasks.map((item, index) => {
            return (
            <tr key={index}>
                <td><input style={{cursor:'pointer'}} type="checkbox"/></td>
                <td>{item.todo}</td>
                <td>{item.thought}</td>
                <td>{item.deadline}</td>
                <td>
                    <abbr title="Edit">
                        <Link to={`edittask/${item.id}`} class="btn btn-secondary btn-sm"><EditIcon/></Link>
                    </abbr>
                </td>
                <td>
                    <abbr title="Delete">
                        <a class="btn btn-danger btn-sm" type="button" onClick={(e) => deleteTask(e, item.id)}><DeleteIcon/></a>
                    </abbr>
                </td>
            </tr>)
        });
    };
    return (
        
        <div>
            <div class="card m-5">
                <div class="card-header">
                    <h1>Task</h1>
                </div>
                <div class="table-responsive mt-5 p-2">
                    <table className='table table-bordered table-hover table-secondary'>    
                        <thead class="table-primary table-dark">
                            <tr>
                                <th class="col-1">
                                    <abbr title="Add Task">
                                    <Link class="btn btn-dark"to='/addtask'><AddCircleSharpIcon/></Link>
                                    </abbr>
                                </th>
                                <th class="col-4">To Do</th>
                                <th class="col-4">Thought</th>
                                <th class="col-1">Deadline <br/> (yyyy-mm-dd)</th>
                                <th class="col-1">Edit</th>
                                <th class="col-1">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewTask