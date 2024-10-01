<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhienBanXe extends Model
{
    use HasFactory;
    protected $table = 'PhienBanXe';
    protected $primaryKey = 'MaPhienBan';
    public $timestamps = false;
}
