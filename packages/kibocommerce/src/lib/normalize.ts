import type {
  PrCategory,
  CustomerAccountInput,
  Document,
  Product as KiboProduct,
} from '../../schema'

import type { Page } from '@shop0/commerce/types/page'
import type { Category } from '@shop0/commerce/types/site'
import type { Product } from '@shop0/commerce/types/product'
import type { Customer } from '@shop0/commerce/types/customer'
import type { Cart, LineItem } from '@shop0/commerce/types/cart'
import type { WishlistItem } from '@shop0/commerce/types/wishlist'

export function normalizeProduct(
  productNode: KiboProduct,
  config: any
): Product {
  const product = {
    id: productNode.productCode || '',
    name: productNode.content?.productName || '',
    vendor: '',
    path: `/${productNode.productCode}`,
    slug: productNode.productCode || '',
    price: {
      value: productNode?.price?.price ?? 0,
      currencyCode: config.currencyCode,
    },
    description: productNode.content?.productFullDescription || '',
    descriptionHtml: productNode.content?.productFullDescription || '',
    images:
      productNode.content?.productImages?.map((p: any) => ({
        url: `http:${p.imageUrl}`,
        altText: p.imageLabel,
      })) || [],
    variants:
      productNode.variations?.map((v: any) => ({
        id: v.productCode,
        options:
          v.options?.map((o: any) => ({
            ['__typename']: 'MultipleChoiceOption',
            id: o.attributeFQN,
            displayName:
              o.attributeFQN.split('~')[1][0].toUpperCase() +
              o.attributeFQN.split('~')[1].slice(1).toLowerCase(),
            values: [{ label: o.value.toString() }],
          })) ?? [],
      })) ?? [],
    options:
      productNode.options?.map((o: any) => ({
        id: o.attributeFQN,
        displayName: o.attributeDetail.name,
        values: o.values.map((v: any) => ({
          label: v.value.toString(),
        })),
      })) ?? [],
  }

  return product
}

export function normalizePage(page: Document): Page {
  return {
    id: String(page.id),
    name: String(page.name),
    url: page.properties.url,
    body: page.properties.body,
    is_visible: page.properties.is_visible,
    sort_order: page.properties.sort_order,
  }
}

export function normalizeCart(data: any): Cart {
  return {
    id: data.id,
    customerId: data.userId,
    email: data?.email,
    createdAt: data?.created_time,
    currency: {
      code: 'USD',
    },
    taxesIncluded: true,
    lineItems: data.items.map(normalizeLineItem),
    lineItemsSubtotalPrice: data?.items.reduce(
      (acc: number, obj: { subtotal: number }) => acc + obj.subtotal,
      0
    ),
    subtotalPrice: data?.subtotal,
    totalPrice: data?.total,
    discounts: data.orderDiscounts?.map((discount: any) => ({
      value: discount.impact,
    })),
  }
}

export function normalizeCustomer(customer: CustomerAccountInput): Customer {
  return {
    id: String(customer.id),
    firstName: customer.firstName || '',
    lastName: customer.lastName || '',
    email: customer.emailAddress || '',
    acceptsMarketing: !!customer.acceptsMarketing,
  }
}

function normalizeLineItem(item: any): LineItem {
  return {
    id: item.id,
    variantId: item.product.variationProductCode,
    productId: String(item.product.productCode),
    name: item.product.name,
    quantity: item.quantity,
    variant: {
      id: item.product.variationProductCode,
      sku: item.product?.sku,
      name: item.product.name,
      image: {
        url: item?.product?.imageUrl,
      },
      requiresShipping: item?.is_require_shipping,
      price: item?.unitPrice.extendedAmount,
      listPrice: 0,
    },
    options: item.product.options ?? [],
    path: `${item.product.productCode}`,
    discounts: item?.discounts?.map((discount: any) => ({
      value: discount.discounted_amount,
    })),
  }
}

export function normalizeCategory(category: PrCategory): Category {
  return {
    id: category?.categoryCode || '',
    name: category?.content?.name || '',
    slug: category?.content?.slug || '',
    path: `/${category?.content?.slug}`,
  }
}

export function normalizeWishlistItem(
  item: any,
  config: any,
  includeProducts = false
): WishlistItem {
  if (includeProducts) {
    return {
      id: item.id,
      productId: String(item.product.productCode),
      variantId: item.product.variationProductCode,
      product: getProuducts(item, config),
    }
  } else {
    return getProuducts(item, config)
  }
}

function getProuducts(item: any, config: any): any {
  return {
    variant_id: item.product.variationProductCode || '',
    id: String(item.product.productCode),
    product_id: String(item.product.productCode),
    name: item.product.name,
    quantity: item.quantity,
    images: [
      {
        url: `http:${item.product.imageUrl}`,
        alt: item.product.imageAlternateText,
      },
    ],
    price: {
      value: item.product.price.price,
      retailPrice: item.product.price.retailPrice || 0,
      currencyCode: config.currencyCode,
    },
    variants: [
      {
        id: item.product.variationProductCode || '',
        sku: item.product?.sku,
        name: item.product.name,
        image: {
          url: item?.product.imageUrl,
        },
      },
    ],
    options: item.product.options ?? [],
    path: `/${item.product.productCode}`,
    description: item.product.description,
  }
}
