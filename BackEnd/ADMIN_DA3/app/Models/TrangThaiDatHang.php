<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrangThaiDatHang extends Model
{
    use HasFactory;
    protected $table = 'TrangThaiDatHang';
    protected $primaryKey = 'MaTrangThai';
    public $timestamps = false;
}
