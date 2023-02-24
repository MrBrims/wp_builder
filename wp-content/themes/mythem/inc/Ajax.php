<?php

namespace DE;

class Ajax
{
  const USERNAME = 'restapiuser';
  const PASSWORD = '';
  const REST_API = 'https://akademily.de/wp-json/wp/v2/requests';
  const REST_API_DOUBLE = 'https://akademilyclon.lyson-belarus.by/wp-json/wp/v2/requests';

  public function __construct()
  {
    add_action('wp_ajax_sendForm', [$this, 'mailer']);
    add_action('wp_ajax_nopriv_sendForm', [$this, 'mailer']);
  }

  public function mailer()
  {
    if (empty($_POST)) {
      wp_send_json_error();
    }

    $score = 'Рейтинг неизвестен';
    if (!empty($_POST['recaptcha_response'])) {
      $url = 'https://www.google.com/recaptcha/api/siteverify';
      $key = ''; 
      $recaptcha = $_POST['recaptcha_response'];

      $recaptcha = file_get_contents($url . '?secret=' . $key . '&response=' . $recaptcha);
      $recaptcha = json_decode($recaptcha);

      $score = 'Проверено на спам, рейтинг: ' . $recaptcha->score;
      if ($recaptcha->score < 0.5) {
        $score = 'Возможно спам, рейтинг: ' . $recaptcha->score;
      }
    }

    $subject = sprintf(
      '/ %s / %s - %s',
      Helpers::siteUri(),
      get_bloginfo('name'),
      Helpers::siteFormName($_POST['form-id']),
    );

    $message = '';
    foreach ($_POST as $key => $value) {
      if (in_array($key, ['form-id', 'action', 'recaptcha_response'])) {
        continue;
      }

      $string = (is_array($value)) ? implode(', ', $value) : $value;
      $message .= sprintf('<p>%s : %s </p>', ucfirst($key), $string);
    }
    $message .= sprintf('<p>%s</p>', $score);

    $id = $this->sendDataToAkademily($subject, $message);

    $this->sendDataToTelegram($id, $subject, $score);

    wp_send_json_success();
  }

  private function sendDataToAkademily($subject, $message): int
  {
    $dataString = json_encode([
      'title' => $subject,
      'content' => $message,
      'status' => 'publish'
    ]);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, self::REST_API);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'Content-Type: application/json',
      'Content-Length: ' . strlen($dataString),
      'Authorization: Basic ' . base64_encode(self::USERNAME . ':' . self::PASSWORD),
    ]);

    $result = curl_exec($ch);
    $response = json_decode($result, true);

    curl_close($ch);

    return $response['id'];
  }

  private function sendDataToTelegram($id, $subject, $score)
  {
    $token = '';

    $text = "<b>ВНИМАНИЕ!</b> K-3 {$subject}\r\n";
    $text .= "<b>Время</b>: " . date('d-m-Y H:i:s') . "\r\n";
    $text .= "{$score} \r\n<b>Не зарегистрировано в 1С</b>\r\n";
    $text .= "<a href='https://akademily.de/wp-admin/post.php?post=" . $id . "&action=edit'><b>Перейти к заявке</b></a>\r\n";

    $data = [
      'parse_mode' => 'html',
      'chat_id' => '-1001199768955',
      'text' => $text
    ];

    file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?" . http_build_query($data));
  }
}

new Ajax();