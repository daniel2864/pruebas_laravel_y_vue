<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('image_user')->after('email')->nullable();
            $table->string('phone', 15)->after('image_user');
            $table->dateTime('session_date')->after('phone')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('image_user');
            $table->dropColumn('phone');
            $table->dropColumn('session_date');
        });
    }
};
