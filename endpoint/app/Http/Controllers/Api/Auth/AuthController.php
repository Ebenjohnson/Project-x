<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Utils\Constants;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /**
     * service
     *
     * @var mixed
     */
    private $service;

    public function __construct()
    {
        $this->service = new UserService();
    }

    /**
     * login
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $data = $request->validate($this->service->model()::loginRules());

        if (!Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return response()->json(['message' => 'invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json($this->generateToken(auth()->user()));
    }


    /**
     * register new user
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $data = $request->validate($this->service->model()::storeRules(), $this->service->model()::errorMessages());
        $data['password'] = bcrypt($data['password']);

        $user = $this->service->store($data);

        return response()->json($this->generateToken($user));
    }

    /**
     * Get authenticate user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticatedUser()
    {
        $user = $this->service->model()::where('id', auth()->user()->id)
            ->with('role')
            ->first();

        return response()->json($user);
    }

    /**
     * Generate token and respective token details
     *
     * @param App\Models\User $user
     * @return array
     */
    private function generateToken($user)
    {

        $data['access_type'] = 'Bearer';

        $data['access_token'] = $user->createToken('login')->accessToken;

        $data['expires_at'] = now()->addDays(30)->timestamp;

        return $data;
    }
}
