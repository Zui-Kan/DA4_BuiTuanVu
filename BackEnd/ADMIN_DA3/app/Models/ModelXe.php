<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelXe extends Model
{
    use HasFactory;
    protected $table = 'ModelXe';
    protected $primaryKey = 'MaModelXe';
    public $timestamps = false;
}
