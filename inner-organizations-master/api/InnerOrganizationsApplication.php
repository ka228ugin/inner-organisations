<?php

/**
 * Created by PhpStorm.
 * User: PrK_01
 * Date: 22.05.2017
 * Time: 16:56
 */

namespace app;


use Internal\Api\Application;
use Internal\Api\Modules\Man\Photo;
use Internal\Api\Request;
use Internal\Api\Router;
use Internal\DB\Config\OraDbConfig;
use Internal\Util\Logger;

class InnerOrganizationsApplication extends Application
{
    public static $DEBUG = false;
    private $logger;
    public function __construct($app_config)
    {
        parent::__construct($app_config);
        self::$DEBUG = $this->getConfig()->isDebug();
        OraDbConfig::$DEFAULT_CONFIG = self::getOraConfig();
        $this->logger = new Logger("INNER_ORGANIZATIONS");
        $this->logger->setOutput(Logger::$PROJECT_LOG);
        $this->logger->useTags(true);
        $this->logger->catchFatal(true);
    }

    public function start(Request $request)
    {
        $router = new Router();
        $router->setLogger($this->logger);
        $router->setResultKey('data');
        $router->setStateKey('success');
        $router->registerComponent(new Photo(self::getOraConfig()));
        return $router->start($request);
    }

    public static function getOraConfig() {
        return new OraDbConfig(true);
    }
}