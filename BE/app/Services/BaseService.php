<?php

namespace App\Services;

/**
 * Class BaseService
 * @package App\Services
 */

//
abstract class BaseService
{
    /**
     * @var mixed
     */
    protected $repository;

    /**
     * BaseService constructor.
     * @param $repository
     */
    public function __construct($repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->repository->all();
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function findById($id)
    {
        return $this->repository->find($id);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    /**
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function delete($id)
    {
        return $this->repository->delete($id);
    }
}
