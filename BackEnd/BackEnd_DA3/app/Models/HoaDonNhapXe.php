<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoaDonNhapXe extends Model
{
    use HasFactory;
    protected $table = 'HoaDonNhapXe';
    protected $primaryKey = 'MaHoaDonNhap';
    public $timestamps = false;
}
