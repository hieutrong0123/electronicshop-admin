import React from 'react';

import Toaster from './views/notifications/toaster/Toaster';
import Tables from './views/base/tables/Tables';

import Breadcrumbs from './views/base/breadcrumbs/Breadcrumbs';
import Cards from './views/base/cards/Cards';
import Carousels from './views/base/carousels/Carousels';
import Collapses from './views/base/collapses/Collapses';
import BasicForms from './views/base/forms/BasicForms';

import Jumbotrons from './views/base/jumbotrons/Jumbotrons';
import ListGroups from './views/base/list-groups/ListGroups';
import Navbars from './views/base/navbars/Navbars';
import Navs from './views/base/navs/Navs';
import Paginations from './views/base/paginations/Pagnations';
import Popovers from './views/base/popovers/Popovers';
import ProgressBar from './views/base/progress-bar/ProgressBar';
import Switches from './views/base/switches/Switches';

import Tabs from './views/base/tabs/Tabs';
import Tooltips from './views/base/tooltips/Tooltips';
import BrandButtons from './views/buttons/brand-buttons/BrandButtons';
import ButtonDropdowns from './views/buttons/button-dropdowns/ButtonDropdowns';
import ButtonGroups from './views/buttons/button-groups/ButtonGroups';
import Buttons from './views/buttons/buttons/Buttons';
import Charts from './views/charts/Charts';
import Dashboard from './views/dashboard/Dashboard';
import CoreUIIcons from './views/icons/coreui-icons/CoreUIIcons';
import Flags from './views/icons/flags/Flags';
import Brands from './views/icons/brands/Brands';
import Alerts from './views/notifications/alerts/Alerts';
import Badges from './views/notifications/badges/Badges';
import Modals from './views/notifications/modals/Modals';
import Colors from './views/theme/colors/Colors';
import Typography from './views/theme/typography/Typography';
import Widgets from './views/widgets/Widgets';
import Users from './views/users/Users';
import User from './views/users/User';
import UserForms from './views/users/UserForm';
import UserDetails from './views/users/UserDeatils';
import UserEdit from './views/users/UserEdit';
import ProductForm from './views/products/ProductForm';


const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', exact : true, name: 'Home', component: Dashboard },
  { path: '/dashboard', exact : true, name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact : true, name: 'Theme', component: Colors },
  { path: '/theme/colors', exact : true, name: 'Colors', component: Colors },
  { path: '/theme/typography', exact : true, name: 'Typography', component: Typography },
  { path: '/base', exact : true, name: 'Base', component: Cards},
  { path: '/base/breadcrumbs', exact : true, name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', exact : true, name: 'Cards', component: Cards },
  { path: '/base/carousels', exact : true, name: 'Carousel', component: Carousels },
  { path: '/base/collapses', exact : true, name: 'Collapse', component: Collapses },
  { path: '/base/forms', exact : true, name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', exact : true, name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', exact : true, name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', exact : true, name: 'Navbars', component: Navbars },
  { path: '/base/navs', exact : true, name: 'Navs', component: Navs },
  { path: '/base/paginations', exact : true, name: 'Paginations', component: Paginations },
  { path: '/base/popovers', exact : true, name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', exact : true, name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', exact : true, name: 'Switches', component: Switches },
  { path: '/base/tables', exact : true, name: 'Tables', component: Tables },
  { path: '/base/tabs', exact : true, name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', exact : true, name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact : true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', exact : true, name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', exact : true, name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', exact : true, name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', exact : true, name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', exact : true, name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', exact : true, name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', exact : true, name: 'Flags', component: Flags },
  { path: '/icons/brands', exact : true, name: 'Brands', component: Brands },
  { path: '/notifications', exact : true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', exact : true, name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', exact : true, name: 'Badges', component: Badges },
  { path: '/notifications/modals', exact : true, name: 'Modals', component: Modals },
  { path: '/notifications/toaster', exact : true, name: 'Toaster', component: Toaster },
  { path: '/widgets', exact : true, name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/create', exact: true, name: 'User Create', component: UserForms },
  //{ path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/users/:id', exact: true, name: 'User Details', component: UserDetails },
  { path: '/users/edit/:id', exact: true, name: 'User Edit', component: UserEdit },
  { path: '/products/create', exact: true, name: 'Product Create', component: ProductForm },
];

export default routes;