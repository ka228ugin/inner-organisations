<?php

/**
 * Created by PhpStorm.
 * User: PrK_01
 * Date: 24.05.2017
 * Time: 13:54
 */

namespace app\model;


use app\InnerOrganizationsApplication;
use Internal\Api\Model\Field\DateField;
use Internal\Api\Model\Field\IntegerField;
use Internal\Api\Model\Field\StringField;
use Internal\Api\Model\WeakDmModel;
use Internal\DB\DBLayer;

class Staff extends WeakDmModel
{
    public static $table = 'inner_organizations_staff';

    public $id;
    public $manid;
    public $org_id;
    public $position;
    public $fullname;
    public $creator_manid;

    public static function fields()
    {
        return [
            'id' => new IntegerField('id', true),
            'manid' => new IntegerField('manid'),
            'org_id' => new IntegerField('org_id'),
            'position' => new StringField('position'),
            'fullname' => (new StringField('fullname'))->useOn(['index', 'update', 'delete', 'insert'], false),
            'creator_manid' => new IntegerField('creator_manid')
        ];
    }

    public static function getDbConfig()
    {
        return InnerOrganizationsApplication::getOraConfig();
    }
}