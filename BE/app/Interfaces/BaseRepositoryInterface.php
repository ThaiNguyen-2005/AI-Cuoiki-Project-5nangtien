<?php

namespace App\Interfaces;

/**
 * Interface BaseRepositoryInterface
 * @package App\Interfaces
 */
interface BaseRepositoryInterface
{
    /**
     * Get all instances of model
     * @return mixed
     */
    public function all();

    /**
     * Find model by ID
     * @param int $id
     * @return mixed
     */
    public function find($id);

    /**
     * Create a new record in the database
     * @param array $data
     * @return mixed
     */
    public function create(array $data);

    /**
     * Update record in the database
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update($id, array $data);

    /**
     * Delete record from the database
     * @param int $id
     * @return mixed
     */
    public function delete($id);
}
