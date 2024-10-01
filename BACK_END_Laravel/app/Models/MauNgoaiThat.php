<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MauNgoaiThat extends Model
{
    use HasFactory;
    protected $table = 'MauNgoaiThat';
    protected $primaryKey = 'MaMauNgoaiThat';
    public $timestamps = false;
}
