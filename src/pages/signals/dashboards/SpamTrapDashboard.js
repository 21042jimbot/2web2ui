import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { Grid, Panel } from 'src/components/matchbox';
import Page from '../components/SignalsPage';
import SpamTrapOverview from '../containers/SpamTrapOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import facets from '../constants/facets';
import _ from 'lodash';
import InfoTooltip from '../components/InfoTooltip';
import { SPAM_TRAP_INFO } from '../constants/info';

export class SpamTrapDashboard extends Component {
  componentDidMount() {
    this.props.getSubaccounts();
  }

  render() {
    const { subaccounts } = this.props;

    return (
      <Page
        title={
          <>
            Spam Trap Monitoring
            <InfoTooltip content={SPAM_TRAP_INFO} />
          </>
        }
      >
        <Panel sectioned>
          <Grid>
            <Grid.Column xs={4}>
              <DateFilter />
            </Grid.Column>
            <SubaccountFilter />
            {/* eslint-disable-next-line */}
            <FacetFilter facets={_.reject(facets, facet => facet.key === 'mb_provider')} />
          </Grid>
        </Panel>
        <SpamTrapOverview defaults={{ perPage: 25 }} subaccounts={subaccounts} hideTitle />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  subaccounts: state.subaccounts.list,
});

const mapDispatchToProps = {
  getSubaccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpamTrapDashboard);
