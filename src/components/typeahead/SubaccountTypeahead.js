import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccountsList } from 'src/actions/subaccounts';
import { hasSubaccounts, selectSubaccounts, getSubaccounts } from 'src/selectors/subaccounts';
import { Typeahead, TypeaheadItem } from 'src/components/typeahead/Typeahead';

export class SubaccountTypeahead extends Component {
  static defaultProps = {
    name: 'subaccount',
  };

  render() {
    const { hasSubaccounts } = this.props;

    if (!hasSubaccounts) {
      return null;
    }

    return (
      <Typeahead
        renderItem={item => <TypeaheadItem label={item.name} id={item.id} />}
        itemToString={item => (item ? `${item.name} (${item.id})` : '')}
        label="Subaccount"
        {...this.props}
      />
    );
  }

  componentDidMount() {
    const { hasSubaccounts } = this.props;
    if (hasSubaccounts) {
      this.props.getSubaccountsList();
    }
  }
}

const mapStateToProps = (state, props) => ({
  hasSubaccounts: hasSubaccounts(state),
  results: props.unfiltered ? getSubaccounts(state) : selectSubaccounts(state),
});

export default connect(mapStateToProps, { getSubaccountsList })(SubaccountTypeahead);
