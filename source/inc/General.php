<?php

namespace DE;

class General
{
  public function __construct()
  {
    // Удаляем из Wordpress ненужные элементы
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_head', 'rest_output_link_wp_head', 10);
    remove_action('wp_head', 'wp_resource_hints', 2);
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('xmlrpc_rsd_apis', 'rest_output_rsd');
    remove_action('template_redirect', 'rest_output_link_header', 11);
    remove_action('auth_cookie_malformed', 'rest_cookie_collect_status');
    remove_action('auth_cookie_expired', 'rest_cookie_collect_status');
    remove_action('auth_cookie_bad_username', 'rest_cookie_collect_status');
    remove_action('auth_cookie_bad_hash', 'rest_cookie_collect_status');
    remove_action('auth_cookie_valid', 'rest_cookie_collect_status');
    remove_filter('rest_authentication_errors', 'rest_cookie_check_errors', 100);
    remove_action('init', 'rest_api_init');
    remove_action('rest_api_init', 'rest_api_default_filters', 10);
    remove_action('parse_request', 'rest_api_loaded');

    // Удаление отступа от админ панельки WP
    add_theme_support('admin-bar', array('callback' => '__return_false'));

    // Функции General.php
    add_action('wp_enqueue_scripts', [$this, 'connectedStylesAndScripts']);
    add_action('do_robotstxt', [$this, 'addedRobotsTxt']);
    add_filter('upload_mimes', [$this, 'svgUploadAllow']);

    // Подключение js и css для админки
    add_action('admin_enqueue_scripts', function () {
      wp_enqueue_style('style-admin', get_template_directory_uri() . '/assets/css/admin.css');
      wp_enqueue_script('script-admin', get_template_directory_uri() . '/assets/js/admin.js');
    }, 99);
  }

  /**
   * Подключает скрипты и стили
   */
  public function connectedStylesAndScripts()
  {
    wp_dequeue_style('wp-block-library');

    wp_enqueue_style('style', URI . '/assets/css/app.min.css');

    wp_enqueue_script('main_scripts', URI . '/assets/js/app.min.js', array(), 'null', true);
  }

  /**
   * Добавляет файл роботс
   */
  public function addedRobotsTxt()
  {
    $data[] = 'User-agent: *';
    $data[] = 'Disallow: *';
    $data[] = 'Sitemap: ' . get_site_url(null, '', 'https') . '/sitemap_index.xml';

    echo implode("\r\n", $data);
    die;
  }

  public function svgUploadAllow($mimes)
  {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }
}

new General();
