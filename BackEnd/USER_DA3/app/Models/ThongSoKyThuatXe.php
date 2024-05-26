<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThongSoKyThuatXe extends Model
{
    use HasFactory;
    protected $table = 'ThongSoKyThuatXe';
    protected $primaryKey = 'MaThongSo';
    public $timestamps = false;


}
