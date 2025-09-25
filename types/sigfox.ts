export interface SigfoxDuplicate {
  bsId: string;
  rssi: number;
  nbRep: number;
}

export interface SigfoxComputedLocation {
  lat: number;
  lng: number;
  radius: number;
  source: number;
  status: number;
}

export interface SigfoxCallbackPayload {
  clientId: string;
  messageType: string;
  deviceType: string;
  device: string;
  data: string;
  lqi: string;
  linkQuality: string;
  operatorName: string;
  countryCode: string;
  deviceTypeId: string;
  duplicates: SigfoxDuplicate[];
  computedLocation: SigfoxComputedLocation;
}

export interface SigfoxCallbackQuery {
  time: string;
  seqNumber: string;
}

export interface SigfoxCallbackRequest {
  body: SigfoxCallbackPayload;
  query: SigfoxCallbackQuery;
}