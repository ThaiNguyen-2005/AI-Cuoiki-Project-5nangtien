<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    // 1. Thêm các đường dẫn login/logout nếu không nằm trong cụm api/
    'paths' => ['*'],

    'allowed_methods' => ['*'],

    // 2. Cho phép cả 2 cổng 5174 và 5175 để tránh lỗi khi Vite tự nhảy cổng
    'allowed_origins' => [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5175',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // 3. Phải là true để khớp với withCredentials: true bên React
    'supports_credentials' => true,

];