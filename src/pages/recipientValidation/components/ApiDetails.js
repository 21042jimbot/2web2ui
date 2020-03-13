import React from 'react';
import { Grid } from '@sparkpost/matchbox';
import { Button } from 'src/components/matchbox';
import { Link } from 'react-router-dom';
import styles from './ApiDetails.module.scss';
import CodeBlock from './CodeBlock';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { connect } from 'react-redux';
const Tab = () => <span className={styles.tab} />;
const White = ({ children }) => <span className={styles.white}>{children}</span>;

export const ApiIntegrationDocs = ({ isStandAloneRVSet }) => {
  const codeBlock = (
    <small className={styles.blue}>
      {'{'}
      <br />
      <Tab />
      "results": {'{'}
      <br />
      <Tab />
      <Tab />
      "result": "<White>undeliverable</White>",
      <br />
      <Tab />
      <Tab />
      "valid": <White>false</White>,<br />
      <Tab />
      <Tab />
      "reason": "<White>Invalid Domain</White>",
      <br />
      <Tab />
      <Tab />
      "is_role": <White>false</White>,<br />
      <Tab />
      <Tab />
      "is_disposable": <White>false</White>,<br />
      <Tab />
      <Tab />
      "is_free": <White>false</White>,<br />
      <Tab />
      <Tab />
      "did_you_mean": "<White>harry.potter@hogwarts.edu</White>"<br />
      <Tab />
      {'}'}
      <br />
      {'}'}
    </small>
  );

  const exampleMethod = (
    <div className={styles.SampleRequest}>
      <small>
        <span className={styles.Method}>GET</span>
        <code>
          /api/v1/recipient-validation/single/{'{'}address{'}'}
        </code>
      </small>
    </div>
  );

  const buttonRow = (
    <div>
      <Button color="orange" component={Link} to="/account/api-keys/create">
        Create API Key
      </Button>
      <Button
        className={!isStandAloneRVSet && styles.ApiDocsLink}
        external
        to="https://developers.sparkpost.com/api/recipient-validation/"
      >
        API Docs
      </Button>
    </div>
  );

  return (
    <div className={styles.Container}>
      <Grid>
        <Grid.Column xs={12} md={6} lg={5}>
          <br />
          <div className={styles.Header}>Integrate Now</div>
          <p>
            Validate an email the moment you receive it, in real-time.
            <br />
            Block fake emails and catch typos with a single API request.
          </p>
          {exampleMethod}
          {!isStandAloneRVSet && buttonRow}
        </Grid.Column>
        <Grid.Column xs={12} md={6} lgOffset={1}>
          <div className={styles.CodeSection}>
            <CodeBlock>{codeBlock}</CodeBlock>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return { isStandAloneRVSet: isAccountUiOptionSet('standalone_rv')(state) };
};

export default connect(mapStateToProps, null)(ApiIntegrationDocs);
