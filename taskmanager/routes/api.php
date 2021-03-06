<?php
use App\Http\Controllers\API\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/addtask', [TaskController::class, 'create']);
Route::get('/edittask/{id}', [TaskController::class, 'edit']);
Route::put('/updatetask/{id}', [TaskController::class, 'update']);
Route::delete('/deletetask/{id}', [TaskController::class, 'destroy']);
Route::get('tasks', [TaskController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
