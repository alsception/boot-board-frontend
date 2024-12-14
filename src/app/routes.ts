import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { BoardComponent } from './components/board.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'BootBoard - Home',
    },
    {
      path: 'board/:id',
      component: BoardComponent,
      title: 'BootBoard - Board details',
    },
  ];
  export default routeConfig;