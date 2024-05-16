<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietNhapXe extends Model
{
    use HasFactory;
    protected $table = 'ChiTietNhapXe';
    protected $primaryKey = 'MaChiTietNhapXe';
    public $timestamps = false;
}
