import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, clearFields } from 'redux-form';
import { RadioGroup } from 'src/components/reduxFormWrappers';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { FORMS, ROLES, ROLE_LABELS } from 'src/constants';
import SubaccountAssignment from './SubaccountAssignment';

const ADMIN_ROLE = {
  label: <strong>{ROLE_LABELS[ROLES.ADMIN]}</strong>,
  value: ROLES.ADMIN,
  helpText: 'All permissions. The only user that can manage users, security, and billing settings.',
};

const DEVELOPER_ROLE = {
  label: <strong>{ROLE_LABELS[ROLES.DEVELOPER]}</strong>,
  value: ROLES.DEVELOPER,
  helpText:
    'Setup and development user. Full access to API Keys, and all other email related setup, sending, and reporting features.',
};

const TEMPLATES_ROLE = {
  label: <strong>{ROLE_LABELS[ROLES.TEMPLATES]}</strong>,
  value: ROLES.TEMPLATES,
  helpText:
    'Content and deliverability management user. Has access to Templates, Recipients Lists, Suppressions, AB Testing, and all reporting features.',
};

const REPORTING_ROLE = {
  label: <strong>{ROLE_LABELS[ROLES.REPORTING]}</strong>,
  value: ROLES.REPORTING,
  helpText:
    'Data analytics user. Has access to all reporting features and can view templates. No access to any account or feature settings.',
};

const SUPERUSER_ROLE = {
  label: <strong>{ROLE_LABELS[ROLES.SUPERUSER]}</strong>,
  value: ROLES.SUPERUSER,
};

export class RoleRadioGroup extends React.Component {
  componentDidUpdate(prevProps) {
    const { selectedRole: prevRole } = prevProps;
    const { clearFields, selectedRole } = this.props;

    // Reset subaccount assignment fields when selecting a non reporting role
    if (prevRole === ROLES.REPORTING && selectedRole !== ROLES.REPORTING) {
      clearFields(FORMS.INVITE_USER, false, false, 'useSubaccount', 'subaccount');
    }
  }

  renderRoles() {
    const {
      selectedRole,
      hasSubaccounts,
      useSubaccountChecked,
      allowSuperUser,
      allowSubaccountAssignment,
    } = this.props;

    return [
      ADMIN_ROLE,
      DEVELOPER_ROLE,
      TEMPLATES_ROLE,
      {
        ...REPORTING_ROLE,
        children: allowSubaccountAssignment && hasSubaccounts && (
          <SubaccountAssignment
            selectedRole={selectedRole}
            useSubaccountChecked={useSubaccountChecked}
          />
        ),
      },
      allowSuperUser && SUPERUSER_ROLE,
    ].filter(Boolean);
  }

  render() {
    const { disabled, ...rest } = this.props;

    const roles = this.renderRoles();
    const options = roles.map(role => ({ ...role, disabled }));

    return <RadioGroup label="Role" options={options} {...rest} />;
  }
}

RoleRadioGroup.propTypes = {
  disabled: propTypes.bool.isRequired,
  allowSuperUser: propTypes.bool.isRequired,
  allowSubaccountAssignment: propTypes.bool.isRequired,
};

RoleRadioGroup.defaultProps = {
  disabled: false,
  allowSuperUser: false,
};

const mapStateToProps = state => ({
  selectedRole: formValueSelector(FORMS.INVITE_USER)(state, 'access'),
  hasSubaccounts: hasSubaccounts(state),
  useSubaccountChecked: formValueSelector(FORMS.INVITE_USER)(state, 'useSubaccount'),
});

const mapDispatchToProps = { clearFields };

export default connect(mapStateToProps, mapDispatchToProps)(RoleRadioGroup);
