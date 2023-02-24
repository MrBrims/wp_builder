<?php

// Переменные

$dir = __DIR__ . '/';

define('PATH', $dir);
define('URI', get_template_directory_uri());
define('HOMEPAGE', get_option('page_on_front'));

// Основные настройки
require_once PATH . 'inc/General.php';


// Работа формы
require_once PATH . 'inc/Helpers.php';
require_once PATH . 'inc/Ajax.php';

// Carbon Field
require_once PATH . 'inc/CarbonFields/PageMeta.php';
