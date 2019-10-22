import React from 'react';
import SubaccountTag from 'src/components/tags/SubaccountTag';


const SubaccountTableData = ({ shared_with_subaccounts, subaccount_id, subaccount_name }) => {
  if (!shared_with_subaccounts && !subaccount_id) {
    return null;
  }

  return <SubaccountTag all={shared_with_subaccounts} id={subaccount_id} name={subaccount_name}/>;
};

export default SubaccountTableData;
