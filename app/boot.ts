import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { MainComponent } from './main';

bootstrap(MainComponent, [HTTP_PROVIDERS]);

