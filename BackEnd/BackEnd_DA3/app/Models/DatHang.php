<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatHang extends Model
{
    use HasFactory;
    protected $table = 'DatHang';
    protected $primaryKey = 'MaDatHang';
    public $timestamps = false;
}
