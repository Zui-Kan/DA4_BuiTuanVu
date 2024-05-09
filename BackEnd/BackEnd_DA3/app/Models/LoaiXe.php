<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiXe extends Model
{
    use HasFactory;
    protected $table = 'LoaiXe';
    protected $primaryKey = 'MaLoaiXe';
    public $timestamps = false;
}
