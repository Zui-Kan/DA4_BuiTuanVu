<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuDeBaiViet extends Model
{
    use HasFactory;
    protected $table = 'ChuDeBaiViet';
    protected $primaryKey = 'MaChuDe';
    public $timestamps = false;
}
