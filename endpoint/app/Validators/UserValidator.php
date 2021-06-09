<?php


namespace App\Validators;

use App\Models\Role;
use App\Utils\Constants;
use Illuminate\Validation\Rule;

trait UserValidator
{


    /**
     * login rules
     *
     * @return array
     */
    public static function loginRules()
    {

        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string']
        ];
    }

    /**
     * validation rules for storing a user
     *
     * @return void
     */
    public static function storeRules()
    {
        return [
            'first_name' => ['string', 'required'],
            'last_name' => ['string', 'required'],
            'role_id' => [
                'required', 'integer',
                Rule::in(Role::where('id', '<>', Constants::ADMIN_ROLE_ID)->pluck('id')
                    ->toArray()),

            ],
            'email' => [
                'required', 'email',
                Rule::unique('users', 'email')
                    ->whereNull('deleted_at')
            ],
            'password' => ['required', 'string', 'min:6', 'confirmed']
        ];
    }

    /**
     * validation rules for updating a user
     *
     * @param  mixed $id
     * @return void
     */
    public static function updateRules($id)
    {
        return [
            'first_name' => ['string', 'required'],
            'last_name' => ['string', 'required'],
            'email' => [
                'required', 'email' .
                    Rule::unique('users', 'email')
                    ->ignore($id)
                    ->whereNull('deleted_at')
            ],
        ];
    }

    /**
     * Custom validation error  messages
     *
     * @return array
     */
    public static function errorMessages()
    {
        return [
            'email.unique' => 'Sorry, this email has already been taken',
            'password.min' => 'Sorry, password should have at least 6 characters',
            'role_id.in' => 'Sorry, role is invalid'
        ];
    }
}
