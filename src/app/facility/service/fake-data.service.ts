import { Observable, of } from "rxjs";
import { Facility } from "../models/facility.model";

export class DataService {
    facility$: Observable<Facility> = of({
        name: 'Bobs Hospital Extrordinaire',
        address: {
            street: '123 N Alphabet St.',
            city: 'Jaynesville',
            zip: '00000',
            stateId: 'AK'
        }
    })
}