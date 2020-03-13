import { blacklist } from 'src/pages';
import App from 'src/components/layout/App';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
export default [
  {
    path: '/blacklist/incidents',
    component: blacklist.IncidentsPage,
    layout: App,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    title: 'Blacklist Incidents',
    supportDocSearch: 'blacklist',
    category: 'Blacklist',
  },
  {
    path: '/blacklist/watchlist',
    component: blacklist.WatchlistPage,
    layout: App,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    title: 'Watched Monitors',
    supportDocSearch: 'blacklist',
    category: 'Blacklist',
  },
  {
    path: '/blacklist/watchlist/add',
    component: blacklist.WatchlistAddPage,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    layout: App,
    title: 'Add to Watch List | Blacklist',
    supportDocSearch: 'blacklist',
    category: 'Blacklist',
  },
  {
    path: '/blacklist/incidents/:id',
    component: blacklist.IncidentDetailsPage,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    layout: App,
    title: 'Incident Details | Blacklist',
    supportDocSearch: 'blacklist',
    category: 'Blacklist',
  },
];
