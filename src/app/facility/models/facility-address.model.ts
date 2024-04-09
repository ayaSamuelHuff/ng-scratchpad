import { Indexable } from "@app/shared/core";

export interface FacilityAddress extends Indexable {
    street: string | null;
    city: string | null;
    zip: string | null;
    stateId: string | null;
}