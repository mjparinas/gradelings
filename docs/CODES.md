# Redeem codes

Codes give a family free access for a while (or for life), or a discount on their first subscription. A parent enters one in the parent area under **Subscription > Have a code?**. Each family can use a code once.

## Turning it on

Set `ADMIN_TOKEN` to at least 24 random characters (for example `openssl rand -base64 32`). Without it, `/api/admin/codes/` answers 404. Every call sends `Authorization: Bearer $ADMIN_TOKEN`.

## Making codes

```bash
SITE=https://<domain>
AUTH="Authorization: Bearer $ADMIN_TOKEN"

# Lifetime access (leave out "days")
curl -X POST "$SITE/api/admin/codes/" -H "$AUTH" -H "content-type: application/json" -d '{"kind":"access","note":"Partner school"}'

# One year, six months
curl -X POST "$SITE/api/admin/codes/" -H "$AUTH" -H "content-type: application/json" -d '{"kind":"access","days":365}'
curl -X POST "$SITE/api/admin/codes/" -H "$AUTH" -H "content-type: application/json" -d '{"kind":"access","days":182}'

# 25% off the first payment, a custom code, 100 uses, until the end of 2026
curl -X POST "$SITE/api/admin/codes/" -H "$AUTH" -H "content-type: application/json" \
  -d '{"kind":"discount","percentOff":25,"code":"FALL25","maxUses":100,"expiresAt":1798761600000}'

# 50% off for three months, or 20% off every payment
curl -X POST "$SITE/api/admin/codes/" -H "$AUTH" -H "content-type: application/json" -d '{"kind":"discount","percentOff":50,"duration":"repeating","months":3}'
curl -X POST "$SITE/api/admin/codes/" -H "$AUTH" -H "content-type: application/json" -d '{"kind":"discount","percentOff":20,"duration":"forever"}'

# List every code with its use count, or stop one working
curl "$SITE/api/admin/codes/" -H "$AUTH"
curl -X DELETE "$SITE/api/admin/codes/" -H "$AUTH" -H "content-type: application/json" -d '{"code":"FALL25"}'
```

| Field | For | Meaning |
| --- | --- | --- |
| `kind` | all | `access` or `discount` |
| `code` | all | Optional. 6 to 32 letters or digits; dashes and spaces are ignored. Left out, a random 12-character code is made (shown as `ABCD-EFGH-JKMN`). Short custom codes are easy to guess, so use them for discounts, not access. |
| `days` | access | Days of free access, 1 to 3650. Left out means lifetime. |
| `percentOff` | discount | 1 to 100 |
| `duration` | discount | `once` (first payment, the default), `repeating` with `months` (1 to 36), or `forever` |
| `stripeCoupon` | discount | Optional. An existing Stripe coupon id to use instead of making one. |
| `maxUses` | all | Optional. How many families can use it in total. |
| `expiresAt` | all | Optional. Last moment it can be redeemed, in milliseconds since 1970. |
| `note` | all | Optional. Who it was for, up to 200 characters. |

## How it works

- **Access codes** set `families.access_until`. A second code adds to the end of the access already there; lifetime is `LIFETIME_ACCESS` in `src/lib/plan.ts`. It is separate from the Stripe plan, so cancelling a subscription doesn't take code access away. The family sees "Premium from your code" with the end date, and gets no upgrade prompts or trial emails while it lasts.
- **Discount codes** are saved on the family (`families.discount_code`) and applied at the next checkout as a Stripe coupon, made the first time the code is used and then reused. Stripe's own promotion-code box is hidden for that checkout, because Stripe allows one or the other. The discount is cleared when the checkout is paid. A family that already has a membership can't redeem a discount.
- **Disabling** a code stops new redemptions and drops a discount that is still waiting, but access already granted stays.
- Wrong, disabled, expired and used-up codes all get the same message, and redeeming is rate limited (10 tries an hour per account, 30 per address), so codes can't be found by guessing.
- Class student accounts can't redeem codes; they already have everything.
- Deleting an account deletes its redemptions.
