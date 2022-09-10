<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_ad_categories';
    protected $fillable = [
        'title',
        'description',
        'parent_id',
    ];

    public function parent()
    {
        return $this->hasOne(AdCategory::class, 'parent_id');
    }
}
