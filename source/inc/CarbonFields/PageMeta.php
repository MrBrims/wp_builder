<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;

class PageMeta
{
  public function __construct()
  {
    add_action('carbon_fields_register_fields', [$this, 'customFields']);
  }

  public function customFields()
  {
  }
}

new PageMeta();
