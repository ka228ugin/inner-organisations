<?php
/**
 * Created by PhpStorm.
 * User: PrK_01
 * Date: 22.05.2017
 * Time: 16:55
 */
include_once '/var/www/classes/Internal/Loader.php';

$request = \Internal\Api\Request::createFromGlobal();
$request->setTrustedData(['manid' => 89813]);
//$request->setTrustedData(['manid' => 39465]);

$app = new \app\InnerOrganizationsApplication(dirname(__DIR__) . '/app_config.json');

$app->start($request)->jsonOut();