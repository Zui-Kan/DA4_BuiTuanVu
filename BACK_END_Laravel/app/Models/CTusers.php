<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CTusers extends Model
{
    use HasFactory;
    protected $table = 'CTusers';
    protected $primaryKey = 'MaCTusers';
    public $timestamps = false;
    public function Users()
    {
        return $this->belongsTo(Users::class, 'TaiKhoanID');
    }
}
