export interface ShopifyCheckout {
  id: string;
  webUrl: string;
}

export interface ShopifyImage {
  url: string;
  altText?: string;
}

export interface ShopifyProduct {
  id?: string 
  title: string
  handle: string
  description?: string | null
  vendor: string      
  tags: string[]
  images: ShopifyImage[]
  price: number         
  rating?: number 
  data: string      
  categoryId?: string;
  collectionHandle?: string; 
  collectionTitle?: string;
  variants?: {
    id: string
  }[]
}

export interface CartItem {
  variantId: string;
  quantity: number;
}

export interface CartButtonProps {
  variantId: string;
  title: string;
  price: number;
  image?: string;
}

export interface ShopifyCartItem {
  variantId: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  lineId?: string; // Shopify cart line ID for updates
}


export interface CartContextValue {
  cart: ShopifyCartItem[];
  addItem: (item: ShopifyCartItem) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  checkout: () => Promise<void>;
  buyNow: (item: ShopifyCartItem) => Promise<void>;
}


export type ProductItem = {
  id: string;
  handle: string;
  title: string;
  price: number;
  categoryId?: string;
  collectionHandle?: string;
  collectionTitle?: string;
  vendor?: string;
  rating?: number;
  images: ShopifyImage[];
};



export interface ProductsGridProps {
  products: ProductItem[]
  viewMode: "grid" | "list"
  onViewChange: (mode: "grid" | "list") => void
}





export interface CustomerCreateResponse {
  customerCreate: {
    customer: {
      id: string
      email: string
      firstName?: string
      lastName?: string
      phone?: string
      acceptsMarketing: boolean
      createdAt: string
    } | null
    customerUserErrors: {
      code?: string
      field?: string[]
      message: string
    }[]
  }
}

export interface CustomerAccessTokenCreateResponse {
  customerAccessTokenCreate: {
    customerAccessToken: {
      accessToken: string
      expiresAt: string
    } | null
    customerUserErrors: {
      code?: string
      field?: string[]
      message: string
    }[]
  }
}

export interface CustomerAccessTokenRenewResponse {
  customerAccessTokenRenew: {
    customerAccessToken: {
      accessToken: string
      expiresAt: string
    } | null
    userErrors: {
      field?: string[]
      message: string
    }[]
  }
}

export interface CustomerAddress {
  id: string
  address1?: string
  address2?: string
  city?: string
  province?: string
  provinceCode?: string
  country?: string
  countryCodeV2?: string
  zip?: string
  phone?: string
  firstName?: string
  lastName?: string
}

export interface MailingAddressInput {
  address1: string
  address2?: string
  city: string
  province?: string
  country: string
  zip: string
  phone?: string
  firstName?: string
  lastName?: string
}

export interface CustomerAddressCreateResponse {
  customerAddressCreate: {
    customerAddress: CustomerAddress | null
    customerUserErrors: {
      code?: string
      field?: string[]
      message: string
    }[]
  }
}

export interface CustomerAddressUpdateResponse {
  customerAddressUpdate: {
    customerAddress: CustomerAddress | null
    customerUserErrors: {
      code?: string
      field?: string[]
      message: string
    }[]
  }
}

export interface CustomerAddressDeleteResponse {
  customerAddressDelete: {
    deletedCustomerAddressId: string | null
    customerUserErrors: {
      code?: string
      field?: string[]
      message: string
    }[]
  }
}

export interface CustomerDefaultAddressUpdateResponse {
  customerDefaultAddressUpdate: {
    customer: {
      id: string
      defaultAddress: CustomerAddress | null
    } | null
    customerUserErrors: {
      code?: string
      field?: string[]
      message: string
    }[]
  }
}

export interface CustomerOrder {
  id: string
  orderNumber: string
  processedAt: string
  financialStatus: string
  fulfillmentStatus: string | null
  totalPriceV2: {
    amount: string
    currencyCode: string
  }
}

export interface Customer {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  phone?: string
  acceptsMarketing: boolean
  createdAt: string
  defaultAddress?: CustomerAddress
  addresses?: CustomerAddress[]
  orders?: CustomerOrder[]
}

export interface GetCustomerResponse {
  customer: {
    id: string
    email: string
    firstName?: string
    lastName?: string
    phone?: string
    acceptsMarketing: boolean
    createdAt: string
    defaultAddress?: CustomerAddress
    addresses: {
      edges: { node: CustomerAddress }[]
    }
    orders: {
      edges: { node: CustomerOrder }[]
    }
  } | null
}


export interface CustomerAccessTokenDeleteResponse {
  customerAccessTokenDelete: {
    deletedAccessToken: string | null
    deletedCustomerAccessTokenId: string | null
    userErrors: {
      field?: string[]
      message: string
    }[]
  }
}