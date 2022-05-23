<?php
/**
 * Created by PhpStorm.
 * User: PrK_01
 * Date: 24.05.2017
 * Time: 14:03
 */
namespace app\controller;
use app\model\Organization;
use app\model\Staff;
use Internal\Api\ComponentController;
use Internal\Api\Request;
use Internal\Storage\StorageFile;
use Internal\Util\DBProvider;
class OrganizationController extends ComponentController
{
    public function fetch(Request $request)
    {
        $type = $request->getQueryValue('type');
        $list = [];
        switch ($type) {
            case 'all':
                $list = Organization::findAll();
                break;
            case 'byMember':
                $manid = $request->getQueryValue('manid');
                /** @var Staff[] $members */
                $members = Staff::findByManid($manid);
                foreach ($members as $member) {
                    $list[] = Organization::findOneById($member->org_id);
                }
                break;
            case 'byId':
                $id = $request->getQueryValue('id');
                /** @var Organization $list */
                $list = Organization::findOneById($id);
                break;
        }
        return $list;
    }
    public function insert(Request $request)
    {
        $data = $request->unwrapBody();
        $organization = new Organization($data);
        $organization->save();
    }
    public function update(Request $request)
    {
        $id = $request->getBodyValue('id');
        /** @var Organization $organization */
        $organization = Organization::findOneById($id);
        $data = $request->unwrapBody();
        $organization->init($data);
        $organization->save();
    }
    public function delete(Request $request)
    {
        $org_id = $request->getBodyValue('org_id');
        Organization::deleteById($org_id);
    }
}