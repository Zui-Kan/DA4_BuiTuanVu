<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => ['login', 'refresh']]);
    }
    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"Auth"},
     *     @OA\Parameter(
     *         name="username",
     *         in="query",
     *         description="",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="User's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */


    public function login(Request $request)
    {
        $login = $request->input('username');

        if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
            $credentials = ['email' => $login, 'password' => $request->password];
        } else {
            $credentials = ['name' => $login, 'password' => $request->password];
        }

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Tên tài khoản hoặc mật khẩu không đúng!'], 401);
        }

        return $this->respondWithToken($token);
    }
    /**
     * @OA\Get(
     *     path="/api/auth/logout",
     *    tags={"Auth"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Successfully logged out',
            'status_code' => 200,
        ]);
    }



    /**
     * @OA\Get(
     *     path="/api/auth/refresh",
     *    tags={"Auth"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }



    /**
     * @OA\Get(
     *     path="/api/auth/profile",
     *    tags={"Auth"},
     *     summary="Get logged-in user details",
     *     @OA\Response(response="200", description="Success"),
     *     security={{"bearerAuth":{}}}
     * )
     */


    public function profile()
    {
        return response()->json(auth()->user());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ]);
    }
}
