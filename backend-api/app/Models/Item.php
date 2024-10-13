<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Schema;


class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'title',
        'description',
        'location',
        'location_description',
        'reward'
    ];
    
    protected $attributes = [
        'image' => null,
    ];
    

    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->string('locationDescription')->nullable();
            $table->decimal('reward', 8, 2);
            $table->timestamps();
        });
    }

}
