import { shopifyFetch } from "@/lib/shopify/helper"

import type {
  CustomerCreateResponse,
  CustomerAccessTokenCreateResponse,
  CustomerAccessTokenRenewResponse,
  GetCustomerResponse,
  CustomerAccessTokenDeleteResponse,
  CustomerAddressCreateResponse,
  CustomerAddressUpdateResponse,
  CustomerAddressDeleteResponse,
  CustomerDefaultAddressUpdateResponse,
  MailingAddressInput,
  CustomerAddress
} from "@/lib/shopify/types"

export async function customerCreate(email: string, password: string, firstName?: string, lastName?: string) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
          acceptsMarketing
          createdAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `
  const variables = { 
    input: { 
      email, 
      password,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      acceptsMarketing: false
    } 
  }
  const data = await shopifyFetch<CustomerCreateResponse>(query, variables)
  return data.customerCreate
}

export async function customerLogin(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `
  const variables = { input: { email, password } }
  const data = await shopifyFetch<CustomerAccessTokenCreateResponse>(query, variables)
  return data.customerAccessTokenCreate
}

export async function customerAccessTokenRenew(accessToken: string) {
  const query = `
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `
  const variables = { customerAccessToken: accessToken }
  const data = await shopifyFetch<CustomerAccessTokenRenewResponse>(query, variables)
  return data.customerAccessTokenRenew
}

export async function getCustomer(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
        createdAt
        defaultAddress {
          id
          address1
          address2
          city
          province
          provinceCode
          country
          countryCodeV2
          zip
          phone
        }
        addresses(first: 10) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              country
              zip
            }
          }
        }
        orders(first: 10) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `
  const variables = { customerAccessToken: accessToken }
  const data = await shopifyFetch<GetCustomerResponse>(query, variables)
  return data.customer
}

export async function customerLogout(accessToken: string) {
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `
   const variables = { customerAccessToken: accessToken }
  const data = await shopifyFetch<CustomerAccessTokenDeleteResponse>(query, variables)
  return data.customerAccessTokenDelete
}

/**
 * Create a new customer address
 */
export async function customerAddressCreate(
  accessToken: string,
  address: MailingAddressInput
): Promise<CustomerAddressCreateResponse['customerAddressCreate']> {
  const mutation = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
          address1
          address2
          city
          province
          provinceCode
          country
          countryCodeV2
          zip
          phone
          firstName
          lastName
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
    address: {
      address1: address.address1,
      ...(address.address2 && { address2: address.address2 }),
      city: address.city,
      ...(address.province && { province: address.province }),
      country: address.country,
      zip: address.zip,
      ...(address.phone && { phone: address.phone }),
      ...(address.firstName && { firstName: address.firstName }),
      ...(address.lastName && { lastName: address.lastName }),
    },
  };

  const data = await shopifyFetch<CustomerAddressCreateResponse>(mutation, variables);
  return data.customerAddressCreate;
}

/**
 * Update an existing customer address
 */
export async function customerAddressUpdate(
  accessToken: string,
  addressId: string,
  address: MailingAddressInput
): Promise<CustomerAddressUpdateResponse['customerAddressUpdate']> {
  const mutation = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
          address1
          address2
          city
          province
          provinceCode
          country
          countryCodeV2
          zip
          phone
          firstName
          lastName
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
    id: addressId,
    address: {
      address1: address.address1,
      ...(address.address2 && { address2: address.address2 }),
      city: address.city,
      ...(address.province && { province: address.province }),
      country: address.country,
      zip: address.zip,
      ...(address.phone && { phone: address.phone }),
      ...(address.firstName && { firstName: address.firstName }),
      ...(address.lastName && { lastName: address.lastName }),
    },
  };

  const data = await shopifyFetch<CustomerAddressUpdateResponse>(mutation, variables);
  return data.customerAddressUpdate;
}

/**
 * Delete a customer address
 */
export async function customerAddressDelete(
  accessToken: string,
  addressId: string
): Promise<CustomerAddressDeleteResponse['customerAddressDelete']> {
  const mutation = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
    id: addressId,
  };

  const data = await shopifyFetch<CustomerAddressDeleteResponse>(mutation, variables);
  return data.customerAddressDelete;
}

/**
 * Set an address as the default address
 */
export async function customerDefaultAddressUpdate(
  accessToken: string,
  addressId: string
): Promise<CustomerDefaultAddressUpdateResponse['customerDefaultAddressUpdate']> {
  const mutation = `
    mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
        customer {
          id
          defaultAddress {
            id
            address1
            address2
            city
            province
            provinceCode
            country
            countryCodeV2
            zip
            phone
            firstName
            lastName
          }
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
    addressId: addressId,
  };

  const data = await shopifyFetch<CustomerDefaultAddressUpdateResponse>(mutation, variables);
  return data.customerDefaultAddressUpdate;
}
