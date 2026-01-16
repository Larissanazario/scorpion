<?php

namespace App\Http\Controllers;

use App\Mail\TestEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailTestController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'to' => 'nullable|email',
        ]);

        $to = $request->input('to') ?? config('mail.from.address');
        Mail::to($to)->send(new TestEmail());

        return back()->with('success', "Email de teste enviado para {$to}");
    }
}
