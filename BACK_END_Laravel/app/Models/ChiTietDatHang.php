<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietDatHang extends Model
{
    use HasFactory;
    protected $table = 'ChiTietDatHang';
    protected $primaryKey = 'MaChiTietDatHang';
    public $timestamps = false;
}
