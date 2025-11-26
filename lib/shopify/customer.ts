import { shopifyFetch } from "@/lib/shopify/helper"

import type {CustomerCreateResponse, CustomerAccessTokenCreateResponse, CustomerAccessTokenRenewResponse, GetCustomerResponse, CustomerAccessTokenDeleteResponse} from "@/lib/shopify/types"

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
