<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository extends Repository implements UserRepositoryInterface
{
    public function get(int $userId): mixed
    {
        return User::where('id', $userId)->first();
    }

    public function paginate(string|null $username, string|null $name, string|null $family, int $page, int $pageItems): mixed
    {
        return User::where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->orWhere('family', 'LIKE', '%' . $family . '%')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function countAll(): int
    {
        return User::count();
    }

    public function update(User $user, $name, $family): bool
    {
        $data = [
            'name' => $name,
            'family' => $family,
        ];

        return $user->update($data);
    }

    public function changePassword(User $user, string $password): bool
    {
        return DB::statement("UPDATE `tbl_users` SET `password`='$password' WHERE `id`=$user->id");
    }
}
