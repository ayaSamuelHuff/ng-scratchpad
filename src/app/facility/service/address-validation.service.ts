import { FacilityAddress } from "../models/facility-address.model";

export const isGoodAddress = (address?: Partial<FacilityAddress>) => {
    return address?.city && address?.stateId && address?.street && address?.city;
}