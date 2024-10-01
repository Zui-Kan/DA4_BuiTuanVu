<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuangCao extends Model
{
    use HasFactory;
    protected $table = 'QuangCao';
    protected $primaryKey = 'MaQuangCao';
    public $timestamps = false;
}
