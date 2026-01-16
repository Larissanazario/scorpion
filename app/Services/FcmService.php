<?php

namespace App\Services;

use Google\Auth\Credentials\ServiceAccountCredentials;
use GuzzleHttp\Client;

class FcmService
{
    protected string $projectId;
    protected string $credentialsPath;
    protected Client $http;

    public function __construct()
    {
        $this->projectId = config('services.firebase.project_id', env('FIREBASE_PROJECT_ID')) ?? '';
        $this->credentialsPath = base_path(env('FIREBASE_CREDENTIALS', 'storage/app/firebase/service-account.json'));
        $this->http = new Client(['base_uri' => 'https://fcm.googleapis.com']);
    }

    protected function accessToken(): string
    {
        $scopes = ['https://www.googleapis.com/auth/firebase.messaging'];
        $creds = new ServiceAccountCredentials($scopes, $this->credentialsPath);
        $token = $creds->fetchAuthToken();
        return $token['access_token'] ?? '';
    }

    public function sendToToken(string $token, array $notification = [], array $data = []): array
    {
        $payload = [
            'message' => [
                'token' => $token,
                'notification' => $notification ?: [
                    'title' => 'Teste FCM',
                    'body' => 'Notificação enviada via Laravel',
                ],
                'data' => $data,
            ],
        ];

        return $this->request($payload);
    }

    public function sendToTopic(string $topic, array $notification = [], array $data = []): array
    {
        $payload = [
            'message' => [
                'topic' => $topic,
                'notification' => $notification,
                'data' => $data,
            ],
        ];
        return $this->request($payload);
    }

    protected function request(array $payload): array
    {
        $accessToken = $this->accessToken();
        $uri = sprintf('/v1/projects/%s/messages:send', $this->projectId);

        $response = $this->http->post($uri, [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
                'Content-Type' => 'application/json',
            ],
            'json' => $payload,
        ]);

        return [
            'status' => $response->getStatusCode(),
            'body' => json_decode((string) $response->getBody(), true),
        ];
    }
}
