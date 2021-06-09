<?php

namespace App\Utils;

use App\Models\Order;
use Illuminate\Pipeline\Pipeline;

class App
{

    /**
     * paginate or return all resources
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Collection|static[]

     */
    public static function resources($query)
    {
        if (request()->has('paginate') && request()->boolean('paginate') && !empty(request('per_page'))) {

            return $query->paginate(request('per_page'));
        }

        return $query->get();
    }


    /**
     * upload image
     *
     * @param $data
     * @param $pipe
     *
     * @return mixed
     */
    public static function uploadImage($data, $pipe)
    {
        return app(Pipeline::class)
            ->send($data)
            ->through($pipe)
            ->thenReturn();
    }

    /**
     * Generate random string
     *
     * @param  $string
     * @param  $length
     * @return string
     */
    public static function generateItemCode($string, $length)
    {
        $code = '';

        for ($i = 0; $i < $length; $i++) {
            $code .= $string[rand(0, strlen($string) - 1)];
        }

        return $code;
    }

    /**
     * Generate order invoice id
     * s
     * @return string
     */
    public static function generateInvoiceId()
    {
        $date = date('y') . date('m') . date('d');
        $order = Order::withTrashed()->orderBy('id', 'desc')->first();
        if (!$order) {
            return $date . "-001";
        }

        $next = explode('-', $order->invoice_id);


        if (count($next) == 2 && $date == $next[0]) {
            $number = str_pad(($next[1] + 1), 3, '0', STR_PAD_LEFT);
            return  $date . "-" . $number;
        }

        return  $date . "-001";
    }
}
