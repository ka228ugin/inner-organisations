<?php

/**
 * Created by PhpStorm.
 * User: PrK_01
 * Date: 24.05.2017
 * Time: 14:03
 */

namespace app\controller;


use app\model\Staff;
use app\model\Organization;
use Internal\Api\ComponentController;
use Internal\Api\Request;
use Internal\Shared\Man;
use Internal\Storage\StorageFile;
use Internal\Util\DBProvider;

class StaffController extends ComponentController
{
    public function fetch(Request $request)
    {
        $type = $request->getQueryValue('type');

        $list = [];

        switch ($type) {
            case 'all':
                /** @var Staff[] $list */
                $list = Staff::findAll();
                array_map(function($member) {
                    /** @var Man $man */
                    $man = Man::findOneByManid($member->manid);
                    $member->fullname = $man->getFullName();
                }, $list);
                break;
            case 'byOrganization':
                $org_id = $request->getQueryValue('org_id');
                $list = Staff::findByOrgId($org_id);
                array_map(function($member) {
                    /** @var Man $man */
                    $man = Man::findOneByManid($member->manid);
                    $member->fullname = $man->getFullName();
                }, $list);
                break;
        }

        return $list;
    }

    public function insert(Request $request)
    {
        $data = $request->unwrapBody();

        $member = new Staff($data);

        $member->creator_manid = $request->getTrustedValue('creator_manid');

        $member->save();
    }

    public function update(Request $request)
    {
        $id = $request->getBodyValue('id');

        /** @var Staff $member */
        $member = Staff::findOneById($id);

        $data = $request->unwrapBody();

        $member->init($data);

        $member->save();
    }

    public function delete(Request $request)
    {
        $id = $request->getBodyValue('id');

        Staff::deleteById($id);
    }
}