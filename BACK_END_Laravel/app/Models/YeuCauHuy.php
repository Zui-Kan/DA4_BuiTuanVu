<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YeuCauHuy extends Model
{
    use HasFactory;
    protected $table = 'YeuCauHuy';
    protected $primaryKey = 'MaYeuCauHuy';
    public $timestamps = false;
}
