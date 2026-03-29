# TikTok Downloader API

API untuk download video/foto TikTok tanpa watermark, siap deploy ke Vercel.

## Endpoints

| Endpoint | Keterangan |
|---|---|
| `GET /tiktok?url=` | Auto fallback (v1 → v2 → v3), **disarankan** |
| `GET /tiktok/v1?url=` | Sumber: tikwm.com |
| `GET /tiktok/v2?url=` | Sumber: savetik.io |
| `GET /tiktok/v3?url=` | Sumber: savett.cc |

## Contoh Request

```
https://yourproject.vercel.app/tiktok?url=https://www.tiktok.com/@user/video/123456789
```

## Contoh Response (Video)

```json
{
  "status": true,
  "title": "Judul video TikTok",
  "taken_at": "Monday, 1 January 2024 at 10.00.00",
  "region": "ID",
  "id": "123456789",
  "duration": "30 Seconds",
  "cover": "https://...",
  "data": [
    { "type": "watermark", "url": "https://..." },
    { "type": "nowatermark", "url": "https://..." },
    { "type": "nowatermark_hd", "url": "https://..." }
  ],
  "music_info": {
    "id": "...",
    "title": "Nama Musik",
    "author": "Artis",
    "url": "https://..."
  },
  "stats": {
    "views": "1.000.000",
    "likes": "50.000",
    "comment": "1.000",
    "share": "500"
  },
  "author": {
    "id": "...",
    "fullname": "username",
    "nickname": "Nama Tampil",
    "avatar": "https://..."
  }
}
```

## Contoh Response (Foto/Slideshow)

```json
{
  "status": true,
  "data": [
    { "type": "photo", "url": "https://..." },
    { "type": "photo", "url": "https://..." }
  ]
}
```

---

## Cara Deploy ke Vercel

### Metode 1: Via CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Masuk ke folder project dan deploy:
```bash
cd tiktok-api
vercel
```

4. Ikuti instruksi di terminal. Setelah selesai, kamu akan mendapat URL seperti:
```
https://tiktok-api-xxx.vercel.app
```

### Metode 2: Via GitHub

1. Push folder ini ke GitHub repository kamu
2. Buka [vercel.com](https://vercel.com) → **Add New Project**
3. Import repository dari GitHub
4. Klik **Deploy** — Vercel otomatis deteksi konfigurasi

### Metode 3: Via Vercel Dashboard (Drag & Drop)

1. Buka [vercel.com/new](https://vercel.com/new)
2. Drag & drop folder `tiktok-api` ke browser
3. Klik Deploy

---

## Struktur File

```
tiktok-api/
├── api/
│   ├── tiktok.js          → /tiktok (auto fallback)
│   └── tiktok/
│       ├── v1.js          → /tiktok/v1
│       ├── v2.js          → /tiktok/v2
│       └── v3.js          → /tiktok/v3
├── lib/
│   └── tiktok.js          → Core logic
├── package.json
├── vercel.json
└── README.md
```

## Catatan

- Vercel **Hobby plan** (gratis) sudah cukup untuk pemakaian pribadi
- Timeout default Vercel adalah **10 detik** (Hobby) / **60 detik** (Pro)
- Jika sering timeout, upgrade ke Pro atau gunakan endpoint `/tiktok/v1` saja
