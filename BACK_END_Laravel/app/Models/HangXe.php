<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HangXe extends Model
{
    use HasFactory;
    protected $table = 'HangXe';
    protected $primaryKey = 'MaHang';
    public $timestamps = false;
}
