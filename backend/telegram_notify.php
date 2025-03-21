<?php
// Konfigurasi Bot Telegram
$botToken = '8110849181:AAGRC4QSMVayvU50Jd6f0b9YOJAdaSt2__E'; // Ganti dengan token bot Telegram Anda
$chatId = '-4676919972'; // Ganti dengan ID chat Anda

// Log semua data yang masuk (debugging)
file_put_contents('debug_log.txt', date('Y-m-d H:i:s') . " - Request Started\n", FILE_APPEND);
file_put_contents('debug_log.txt', "GET: " . print_r($_GET, true) . "\n", FILE_APPEND);
file_put_contents('debug_log.txt', "POST: " . print_r($_POST, true) . "\n", FILE_APPEND);

/**
 * Fungsi untuk mengirim notifikasi ke Telegram
 */
function kirimNotifikasiTelegram($pesan, $botToken, $chatId) {
    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
    
    $data = [
        'chat_id' => $chatId,
        'text' => $pesan,
        'parse_mode' => 'HTML'
    ];
    
    $options = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    // Log hasil request ke Telegram
    file_put_contents('debug_log.txt', "Telegram API response: " . $result . "\n", FILE_APPEND);
    
    return $result;
}

// 1. TRACKING PENGUNJUNG WEBSITE
if (isset($_GET['track']) && $_GET['track'] == 'visit') {
    file_put_contents('debug_log.txt', "Processing visitor tracking\n", FILE_APPEND);
    
    // Membuat pesan notifikasi pengunjung
    $pesan = "<b>🔔 Pengunjung Website Garden House</b>\n";
    $pesan .= "⏰ Waktu: " . date('Y-m-d H:i:s') . "\n";
    $pesan .= "🌐 IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $pesan .= "📱 User Agent: " . $_SERVER['HTTP_USER_AGENT'];
    
    // Kirim notifikasi
    kirimNotifikasiTelegram($pesan, $botToken, $chatId);
    
    // Kirim gambar transparan 1x1 pixel
    header('Content-Type: image/gif');
    echo base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    exit;
}

// 2. FORM EMAIL FOOTER
file_put_contents('debug_log.txt', "Checking for email submission\n", FILE_APPEND);

// Periksa data JSON raw jika Content-Type adalah application/json
$input = file_get_contents('php://input');
$inputJSON = json_decode($input, true);

if (isset($_POST['email'])) {
    $email = htmlspecialchars($_POST['email']);
    file_put_contents('debug_log.txt', "Email found in POST: $email\n", FILE_APPEND);
} elseif (isset($inputJSON['email'])) {
    $email = htmlspecialchars($inputJSON['email']);
    file_put_contents('debug_log.txt', "Email found in JSON: $email\n", FILE_APPEND);
} else {
    // Coba cara alternatif (mungkin data dikirim dalam format lain)
    parse_str($input, $parsed_input);
    if (isset($parsed_input['email'])) {
        $email = htmlspecialchars($parsed_input['email']);
        file_put_contents('debug_log.txt', "Email found in parsed input: $email\n", FILE_APPEND);
    } else {
        $email = null;
        file_put_contents('debug_log.txt', "No email found in any input source\n", FILE_APPEND);
    }
}

if ($email) {
    // Notifikasi form email
    $pesan = "<b>📧 Berlangganan Email Baru</b>\n";
    $pesan .= "⏰ Waktu: " . date('Y-m-d H:i:s') . "\n";
    $pesan .= "📧 Email: {$email}\n";
    $pesan .= "🌐 IP: " . $_SERVER['REMOTE_ADDR'];
    
    // Kirim notifikasi
    kirimNotifikasiTelegram($pesan, $botToken, $chatId);
    
    // Kirim respons
    echo "Terima kasih! Email Anda berhasil didaftarkan.";
    exit;
}

// Default response
echo "Notifikasi Telegram aktif. Tidak ada data email yang ditemukan.";
file_put_contents('debug_log.txt', "End of script execution\n\n", FILE_APPEND);
?>