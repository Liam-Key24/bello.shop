import { CustomerAddress, MailingAddressInput } from "./types";


export interface AddressListProps {
    addresses: CustomerAddress[];
    defaultAddressId?: string;
    onAddressCreate: (address: MailingAddressInput) => Promise<void>;
    onAddressUpdate: (addressId: string, address: MailingAddressInput) => Promise<void>;
    onAddressDelete: (addressId: string) => Promise<void>;
    onSetDefault: (addressId: string) => Promise<void>;
    isLoading?: boolean;
  }