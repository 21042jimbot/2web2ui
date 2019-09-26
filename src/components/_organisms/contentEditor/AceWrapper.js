import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/mode/text';
import 'brace/mode/json';
import 'brace/theme/tomorrow';
import 'brace/ext/searchbox';

import { Error } from '@sparkpost/matchbox';
import styles from './AceWrapper.module.scss';

const AceWrapper = ({
  input,
  mode,
  readOnly,
  syntaxValidation,
  meta: { error, active, submitFailed }
}) => (
  <div>
    {submitFailed && !active && error && (
      <div className={styles.ErrorWrapper}>
        <Error error={error} />
      </div>
    )}
    <AceEditor
      mode={mode}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      // AceEditor synthetic event doesn't work with redux-form
      onBlur={() => input.onBlur(input.value)}
      onFocus={() => input.onFocus(input.value)}
      readOnly={readOnly}
      theme='tomorrow'
      className='TemplateEditor'
      height='900px'
      width='auto'
      tabSize={2}
      fontSize={12}
      cursorStart={1}
      highlightActiveLine
      showPrintMargin={false}
      setOptions={{
        useWorker: syntaxValidation,
        displayIndentGuides: false
      }}
      editorProps={{ $blockScrolling: Infinity }}
    />
  </div>
);

export default AceWrapper;
