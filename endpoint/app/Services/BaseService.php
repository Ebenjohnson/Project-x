<?php

namespace App\Services;


abstract class BaseService
{
    /**
     * model
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    /**
     * store resource
     *
     * @param  array $data
     * @return mixed
     */
    public function store(array $data)
    {
        return $this->model::create($data);
    }

    /**
     * update resource
     *
     * @param  $id
     * @param  array $data
     * @return mixed
     */
    public function update($id, array $data)
    {
        $resource = $this->show($id);

        if (!$resource) {
            return false;
        }

        $resource->update($data);

        return $resource->fresh();
    }

    /**
     * show resource
     *
     * @param  $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->model::find($id);
    }

    /**
     * delete resource
     *
     * @param  $id
     * @return mixed
     */
    public function destroy($id)
    {
        $resource = $this->model::find($id);

        if (!$resource) {
            return false;
        }

        $resource->delete();

        return true;
    }

    /**
     * view all resources
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function index()
    {
        return $this->model::query();
    }

    /**
     * get model
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function model()
    {
        return $this->model;
    }
}
