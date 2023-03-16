<?php

namespace DE;

class Helpers
{
  public function __construct()
  {
    add_filter('determine_current_user', [$this, 'jsonBasicAuthHandler'], 20);
    add_filter('rest_authentication_errors', [$this, 'jsonBasicAuthError']);
  }

  public function jsonBasicAuthHandler($user)
  {
    global $wp_json_basic_auth_error;
    $wp_json_basic_auth_error = null;
    if (!empty($user)) {
      return $user;
    }

    if (!isset($_SERVER['PHP_AUTH_USER'])) {
      return $user;
    }

    $username = $_SERVER['PHP_AUTH_USER'];
    $password = $_SERVER['PHP_AUTH_PW'];

    remove_filter('determine_current_user', 'json_basic_auth_handler', 20);

    $user = wp_authenticate($username, $password);

    add_filter('determine_current_user', 'json_basic_auth_handler', 20);

    if (is_wp_error($user)) {
      $wp_json_basic_auth_error = $user;
      return null;
    }

    $wp_json_basic_auth_error = true;

    return $user->ID;
  }

  public function jsonBasicAuthError($error)
  {
    if (!empty($error)) {
      return $error;
    }

    global $wp_json_basic_auth_error;
    return $wp_json_basic_auth_error;
  }

  /**
   * Выводит домен сайта без протокола
   * @return string
   */
  public static function siteUri(): string
  {
    $uri = get_site_url(get_current_blog_id());
    $uri = explode('//', $uri);

    return end($uri);
  }

  /**
   * Выводит название формы при отправлении данных, исходя из полученных данных
   * @param string $string
   * @return string
   */
  public static function siteFormName($string = ''): string
  {
    if (!$string) {
      return '';
    }

    $name = '';

    if (in_array($string, ['form-leav'])) {
      $name = 'Форма при попытке покинуть сайт';
    }
    
    if (in_array($string, ['first-form', 'full-form'])) {
      $name = 'Форма в шапке';
    }
    return $name;
  }
}

new Helpers();
