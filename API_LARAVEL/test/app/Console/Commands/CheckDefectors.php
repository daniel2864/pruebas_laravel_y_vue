<?php

namespace App\Console\Commands;
use App\Models\User; 
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmailReminder;

class CheckDefectors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-defectors';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verifica los usuarios que tienen 30 dias sin conectarse.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        
        $current_date  = date("Y-m-d H:i:s");
        $previous_date = date("Y-m-d H:i:s", strtotime($current_date."- 1 month"));
        $data          = User::where('session_date', '<=', $previous_date)->get('email')->chunk(100);
        $delay = now()->addMinutes(1);
        foreach ($data as $key => $value) {
            Mail::to($value[$key]->email)->later($delay, new SendEmailReminder());
        }
    }
}
