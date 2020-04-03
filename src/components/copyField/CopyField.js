import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import { Tooltip } from 'src/components/matchbox';
import { ContentCopy } from '@sparkpost/matchbox-icons';
import { Button, TextField } from 'src/components/matchbox';

/**
 * Reusable TextField with a copy button for strings
 */
class CopyField extends Component {
  static defaultProps = {
    hideCopy: false,
  };

  state = {
    copied: false,
  };

  timeout = null;

  handleFieldFocus = e => {
    e.target.select();
  };

  handleCopy = () => {
    copy(this.props.value);
    this.setState({ copied: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.object) {
      this.setState({ copied: false });
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { value, hideCopy, id, ...fieldProps } = this.props;
    const { copied } = this.state;
    let connectRight = null;

    if (!hideCopy) {
      connectRight = (
        <Tooltip dark content="Copied to clipboard!" disabled={!copied}>
          <Button name="copy-field-button" onClick={this.handleCopy}>
            <ContentCopy size={14} /> Copy
          </Button>
        </Tooltip>
      );
    }

    return (
      <TextField
        id={id}
        name="copy-field"
        readOnly
        connectRight={connectRight}
        value={value}
        onFocus={this.handleFieldFocus}
        {...fieldProps}
      />
    );
  }
}

CopyField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  hideCopy: PropTypes.bool,
};

export default CopyField;
