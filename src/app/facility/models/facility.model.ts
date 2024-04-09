import { Indexable } from "@app/shared/core";
import { FacilityAddress } from "./facility-address.model";

export interface Facility extends Indexable {
    name: string | null;
    address: FacilityAddress;
}