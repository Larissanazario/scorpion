<?php

namespace App\Http\Controllers;

use App\Services\FcmService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FcmController extends Controller
{
    public function registerToken(Request $request)
    {
        $request->validate(['token' => 'required|string']);
        $userId = Auth::id();

        DB::table('fcm_tokens')->updateOrInsert(
            ['token' => $request->token],
            ['user_id' => $userId, 'updated_at' => now(), 'created_at' => now()]
        );

        return response()->json(['status' => 'ok']);
    }

    public function sendTest(Request $request, FcmService $fcm)
    {
        $request->validate(['token' => 'required|string']);
        $res = $fcm->sendToToken($request->token, [
            'title' => 'Scorpion',
            'body' => 'Teste de notificação FCM',
        ], [
            'route' => '/dashboard',
        ]);

        return response()->json($res);
    }
}
