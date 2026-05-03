<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id',        // Thêm cái này để nạp ID thủ công từ Seeder
        'name',
        'email',
        'password',
        'role',      // Thêm cái này để lưu quyền người dùng
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
```[cite: 2]

---

### 2. Chạy lại lệnh làm sạch Database
Sau khi sửa file trên, ông mở Terminal tại thư mục **BE** và chạy lệnh này để nó nạp lại dữ liệu chuẩn 100% vào Database:

```bash
php artisan migrate:fresh --seed
```[cite: 2]
*(Nếu nó báo "Database seeding completed successfully" là ngon)*[cite: 2].

---

### 3. Kiểm tra logic lấy Token ở Frontend
Trong file `BE/app/Http/Controllers/AuthController.php` của ông, ông đang trả về tên biến là `access_token`[cite: 2]:
`return response()->json(['user' => $user, 'access_token' => $token], 200);`[cite: 2]

Nhưng bên Frontend file `login.jsx`, nếu ông chỉ viết `response.data.token` thì nó sẽ bị `undefined` và không vào được[cite: 2].

**Ông mở file `FE/src/page/login.jsx`, tìm hàm `handleLogin` và sửa lại 2 dòng này:**
```javascript
const userRole = response.data.user.role; // Lấy role từ object user
const token = response.data.access_token; // Phải là access_token mới khớp với BE
```[cite: 2]

---

### 🔍 Cách kiểm tra cuối cùng nếu vẫn báo "Sai mật khẩu":
1. Nhấn **F12** trên trình duyệt, chọn tab **Network**.
2. Bấm **Đăng nhập**.
3. Bấm vào dòng chữ `login` màu đỏ, chọn tab **Response**.
   *   Nếu thấy: `{"message": "Unauthorized"}` -> Do mật khẩu trong Seeder và lúc nhập đang bị lệch[cite: 2].
   *   **Mật khẩu chuẩn trong Seeder của ông là:** `admin123`, `teacher123`, hoặc `student123`[cite: 2].

**Ông thực hiện Bước 1 (Sửa Model) và Bước 2 (Chạy migrate:fresh --seed) trước nhé. Đó là nguyên nhân lớn nhất khiến dữ liệu không vào được DB đấy!**[cite: 2]