import {Routes} from '@angular/router';
import {HomeComponent} from './components/home.component';
import {HomePatternComponent} from './components/home.pattern.component';
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
    {
      path: 'pattern',
      component: HomePatternComponent,
      title: 'BootBoard - Home',
    },
    {
      path: 'patterns',
      component: HomePatternComponent,
      title: 'BootBoard - Home',
    },
  ];
  export default routeConfig;