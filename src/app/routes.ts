import {Routes} from '@angular/router';
import {HomeComponent} from './components/home.component';
import {BoardComponent} from './components/board.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'BootBoard - Home',
    },
    {
      path: 'board/:id',
      component: BoardComponent,
      title: ':id'+' Board details | BootBoards',
    },
  ];
  export default routeConfig;