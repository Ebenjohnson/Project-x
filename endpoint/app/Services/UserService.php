<?php

namespace App\Services;

use App\Models\User;

class UserService extends BaseService
{

    public function __construct()
    {
        parent::__construct(User::class);
    }


    /**
     * Find user by username
     *
     * @param  $email
     * @return \App\Models\User
     */
    public function findByEmail($email)
    {
        return $this->model::where('email', $email)->first();
    }
}
