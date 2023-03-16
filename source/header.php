<!DOCTYPE html>
<html lang="<?php bloginfo('language'); ?>">

<head>

  <meta charset="<?php bloginfo('charset'); ?>">

  <title>
    Title
  </title>
  <meta name="description" content="description">

  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

  <link rel="icon" href="<?php bloginfo('template_url'); ?>/assets/images/favicon.ico">
  <style>
    .popup {
      opacity: 0;
      visibility: hidden;
    }
  </style>
  <?php wp_head(); ?>
</head>

<body>
  <div class="wrapper">
    <header class="header lock-padding">
      <?php get_template_part('template-parts/blocks/top-menu'); ?>
    </header>

    <main class="page">