export class Address {
    id: number;
    title: string;
    address: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    longitude: number;
    latitude: number;

    public fromJson(object: any): Address {
      let address = new Address();
      address.id = Number(object.id);
      address.title = object.title;
      address.address = object.address;
      address.created_at = object.created_at;
      address.updated_at = object.updated_at;
      address.longitude = Number(object.longitude);
      address.latitude = Number(object.latitude);
      return address
    }
  }