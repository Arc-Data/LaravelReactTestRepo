<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class,'login']);
    Route::post('/refresh', [AuthController::class,'refresh']);
});

Route::middleware('auth:api')->group(function () {
    Route::prefix('posts')->group(function () {
        Route::get('/', [PostController::class,'index']);
        Route::post('/', [PostController::class,'store']);
        Route::get('/{post}', [PostController::class,'show']);
        Route::delete('/{post}', [PostController::class,'destroy']);
        Route::patch('/{post}', [PostController::class,'update']);
        Route::post('/{post}/like', [PostController::class,'like']);
        
        Route::prefix('{post}/comments')->group(function () {
            Route::get('/', [CommentController::class,'index']);
            Route::post('/', [CommentController::class,'store']);
            Route::patch('comments/{comment}/', [CommentController::class,'update']);
        });
    });

    Route::prefix('comments')->group(function () {
        Route::post('/{comment}/reply', [CommentController::class,'reply']);
        Route::post('/{comment}/like', [CommentController::class,'like']);
        Route::delete('/{comment}/', [CommentController::class,'destroy']);
        Route::patch('/{comment}/', [CommentController::class,'update']);
    });

    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class,'index']);
        Route::get('/{username}', [UserController::class,'show']);
        Route::get('/{user}/posts', [UserController::class,'getUserPosts']);
        Route::post('/', [UserController::class,'update']);
    });

    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class,'index']);
        Route::patch('/', [NotificationController::class,'markAsRead']);
        Route::post('/test', [NotificationController::class,'test']);
    });
});
