import { Observable } from 'rxjs';

export interface BaseComponent {
    canDeactivate:() => boolean | Observable<boolean>
}
