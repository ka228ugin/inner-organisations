<h2>Параметры для организации (organization)</h2>
<ul>
<li>id (number)</li>
<li>name (string) - Наименование</li>
<li>phone (string) - Внутренний телефон</li>
</ul>
<h2>Параметры для участника организации (person)</h2>
<ul>
<li>id (number)</li>
<li>name (string) - Ф.И.О. участника</li>
<li>photo (string) - Ссылка на фото участника</li>
<li>division (string) - Организация (можно сделать привязку к organization.id)</li>
<li>position (string) - Должность участника организации</li>
</ul>

запрсы:

act=staff
    type=all - все участники всех организаций
    type=byOrganization - участники организации(параметр org_id)
    
    методы
    insert
    update - параметры manid и org_id
    delete - параметры manid и org_id
    
act=organization
    type=all - все организации
    type=byMember - все организации человека(параметр manid)
    
    методы
    insert
    update - параметры org_id
    delete - параметры org_id