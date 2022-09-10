<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_ad_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title', 50);
            $table->text('description');
            $table->unsignedBigInteger('parent_id')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_ad_categories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
