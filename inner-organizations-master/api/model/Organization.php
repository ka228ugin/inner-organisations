<?php

/**
 * Created by PhpStorm.
 * User: PrK_01
 * Date: 24.05.2017
 * Time: 13:48
 */

namespace app\model;


use app\InnerOrganizationsApplication;
use Internal\Api\Model\Field\DateField;
use Internal\Api\Model\Field\IntegerField;
use Internal\Api\Model\Field\StringField;
use Internal\Api\Model\WeakDmModel;
use Internal\DB\DBLayer;

class Organization extends WeakDmModel
{
    public static $table = 'inner_organizations';

    public $id;
    public $name;
    public $phone;

    public static function fields()
    {
        return [
            'id' => new IntegerField('id', true),
            'name' => new StringField('name'),
            'phone' => new StringField('phone')
        ];
    }

    public static function getDbConfig()
    {
        return InnerOrganizationsApplication::getOraConfig();
    }
}