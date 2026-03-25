# Demo E-Commerce Variant: Poor <img src="https://img.shields.io/badge/Grade-D-red" alt="Grade D">

This variant demonstrates a bare-bones implementation of the Meta Pixel with no server-side integration (Conversions API). It represents a common but suboptimal setup where a developer has added basic `fbq('track')` calls to a website without a deep understanding of best practices. While it fires standard e-commerce events, it suffers from incomplete parameter data, a complete lack of advanced matching capabilities, and no privacy-enhancing features. This leads to poor event match quality, inaccurate reporting, and weak optimization potential.

## Quick Facts

| Attribute | Value |
| :--- | :--- |
| **Pixel ID** | `1684145446350033` |
| **CAPI Method** | None |
| **Grade** | D |
| **Live Site** | <https://mishaberman.github.io/demo-ecommerce-poor/> |
| **GitHub Repo** | <https://github.com/mishaberman/demo-ecommerce-poor> |

## What's Implemented

- [x] Meta Pixel Base Code
- [x] Standard Event Tracking (Client-Side)
- [x] Basic Product & Transaction Parameters (`value`, `currency`, `content_ids`)

## What's Missing or Broken

- [ ] **Conversions API**: No server-side events are sent.
- [ ] **Advanced Matching**: No user data (email, phone, name, etc.) is collected or sent.
- [ ] **User Data Hashing**: No client or server-side hashing is performed.
- [ ] **`fbp` / `fbc` Cookie Handling**: The `fbp` (browser ID) and `fbc` (click ID) parameters are not sent with server events.
- [ ] **Event Deduplication**: No `event_id` is generated, meaning browser and server events cannot be deduplicated.
- [ ] **Data Processing Options (DPO)**: No privacy parameters are sent to control data usage (e.g., for CCPA/CPRA).
- [ ] **Incomplete Event Parameters**: Key parameters like `content_name` and `num_items` are missing from several events.
- [ ] **Unused Code Parameters**: Function signatures in the code contain underscore-prefixed parameters that are never used, indicating sloppy coding.

## Event Coverage

This table shows which events are firing from the Pixel (client-side) and/or CAPI (server-side).

| Event | Pixel (Browser) | CAPI (Server) |
| :--- | :---: | :---: |
| **ViewContent** | ✅ | ❌ |
| **Search** | ✅ | ❌ |
| **AddToCart** | ✅ | ❌ |
| **InitiateCheckout** | ✅ | ❌ |
| **Lead** | ✅ | ❌ |
| **CompleteRegistration** | ✅ | ❌ |
| **Purchase** | ✅ | ❌ |

## Parameter Completeness

This table details which parameters are sent with each client-side event. Note the absence of user data parameters and other best-practice parameters.

| Event | `content_type` | `content_ids` | `content_name` | `num_items` | `value` | `currency` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **ViewContent** | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Search** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **AddToCart** | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **InitiateCheckout**| ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Lead** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **CompleteRegistration**| ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Purchase** | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |

## Architecture

This variant's tracking is handled entirely by a single client-side JavaScript file: `assets/js/tracking.js`. 

The `fbq('track', ...)` calls are placed directly within the e-commerce event handler functions (e.g., `handleViewContent`, `handleAddToCart`). The functions pull basic data from the DOM to populate event parameters. There is no server-side code, no user data collection, and no advanced features.

## How to Use This Variant

1.  **Testing**: Visit the [live site](https://mishaberman.github.io/demo-ecommerce-poor/) and use the Meta Pixel Helper browser extension to observe the pixel events firing as you navigate the site (view products, add to cart, purchase, etc.).
2.  **Auditing**: Examine the source code in the [GitHub repo](https://github.com/mishaberman/demo-ecommerce-poor), paying close attention to `assets/js/tracking.js` to see how the pixel events are implemented. Note the lack of CAPI, hashing, and other best practices.
