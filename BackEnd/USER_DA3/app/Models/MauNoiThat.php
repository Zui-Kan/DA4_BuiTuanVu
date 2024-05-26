<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MauNoiThat extends Model
{
    use HasFactory;
    protected $table = 'MauNoiThat';
    protected $primaryKey = 'MaMauNoiThat';
    public $timestamps = false;
}
