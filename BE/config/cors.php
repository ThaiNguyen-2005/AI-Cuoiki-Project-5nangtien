<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // 1. Thêm các đường dẫn login/logout nếu ông không để trong cụm api/
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

    'allowed_methods' => ['*'],

    // 2. QUAN TRỌNG: Không được để '*', phải điền chính xác URL của Frontend
    'allowed_origins' => ['http://localhost:5174'], 

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // 3. QUAN TRỌNG: Phải chuyển thành true để khớp với withCredentials bên React
    'supports_credentials' => true,

];