import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listTemplates } from 'src/actions/templates';
import { selectPublishedTemplatesBySubaccount } from 'src/selectors/templates';
import { Typeahead, TypeaheadItem } from 'src/components/typeahead/Typeahead';

export class TemplateTypeahead extends Component {
  static defaultProps = {
    name: 'template',
  };

  componentDidMount() {
    const { results, listTemplates } = this.props;

    // For redux-form FieldArrays
    // Subsequent GETs on this list will refresh any selector using it,
    // which also forces a form reinitialize if used in a form's initialValues.
    if (results.length === 0) {
      listTemplates();
    }
  }

  render() {
    const { hasTemplates } = this.props;

    return (
      <Typeahead
        renderItem={item => <TypeaheadItem label={item.id} />}
        itemToString={item => (item ? item.id : '')}
        label="Template"
        disabled={!hasTemplates}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const templates = selectPublishedTemplatesBySubaccount(state, props.subaccountId);
  return {
    results: templates,
    hasTemplates: templates.length > 0,
  };
}

export default connect(mapStateToProps, { listTemplates })(TemplateTypeahead);
