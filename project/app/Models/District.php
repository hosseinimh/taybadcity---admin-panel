<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class District extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_districts';
    protected $fillable = [
        'name',
        'description',
        'parent_id',
        'lat',
        'lng',
    ];

    protected static function booted()
    {
    }

    public function parent()
    {
        return $this->hasOne(District::class, 'parent_id');
    }
}
