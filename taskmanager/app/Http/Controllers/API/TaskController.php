<?php

namespace App\Http\Controllers\API;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index () {
        $task = Task::all();
        return response()->json(['status'=>200, "tasks"=>$task]);
    }
    
    //edit function
    public function edit($id){
        $task = Task::find($id);
        if ($task) {
            return response()->json(['status' => 200, "task" => $task]);
        } else {
            return response()->json(['status' => 404, "message" => 'No task ID Found!']);
        }
    }
    //delete function
    public function destroy($id) {
        $task = Task::find($id);
        if ($task) {
            $task -> delete();
            return response()->json(['status' => 200, "message" => 'Task Deleted Successfully!']);
        } else {
            return response()->json(['status' => 404, "message" => 'No task ID Found!']);
        }
    }

    //update function
    public function update(Request $request, $id) {
        {
            $validator = Validator::make($request->all(), [
                "todo" => "required",
                "thought" => "required",
                "deadline" => "required",
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, "validationErrors" => $validator->errors()]);
            } else {
                $task = Task::find($id);
                if ($task) {
                    $task->todo = $request->input('todo');
                    $task->thought = $request->input('thought');
                    $task->deadline = $request->input('deadline');
                    $task->update();
                    return response()->json(['status' => 200, "message" => 'Task Updated Successfully!']);

                } else {
                    return response()->json(['status' => 404, "message" => 'No task ID Found!']);
                }
            }
        }
    } 

    // create function
    public function create (Request $request) {
        $validator = Validator::make($request->all(),[
            "todo"=>"required", 
            "thought"=>"required", 
            "deadline"=>"required", 
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validate_err"=>$validator->errors()]);
        }
        else {
            $task = New Task();
            $task->todo=$request->input('todo');
            $task->thought=$request->input('thought');
            $task->deadline=$request->input('deadline');
            $task->save(); //query builder orm
            return response()->json(['status'=>200, 'message'=>'Task addded succesfully']);
        }

    }
    
}