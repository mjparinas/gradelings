# Google sign-in ("Continue with Google")

One-tap sign-in and sign-up for **parents and teachers** on the parent area's Account page and on `/teachers/`. It is the OpenID Connect authorization-code flow with PKCE, called over plain HTTPS with no SDK, so no Google script is loaded and the content security policy is unchanged. Code: `src/server/google.ts`, `src/app/api/auth/google/` (start and callback), `src/app/api/auth/providers/`, `src/components/GoogleButton.tsx`.

## How it behaves

- The button is a link to `/api/auth/google/?from=parents|teachers`. The server keeps a one-use state, nonce and PKCE verifier in a 10-minute HttpOnly cookie, sends the browser to Google, and Google returns it to `/api/auth/google/callback/`. We read only the **email** and Google's permanent **sub** (`scope=openid email`).
- Only a Google-**verified** email counts.
- **Same Google person** (stored `parents.google_sub`): signs in to the same account, even if their Google email later changes. A "new sign-in" email goes to the parent, as with a password.
- **Same email as an existing account**: Google is linked to it and the parent gets a "Google sign-in was added" email. If that account's email was never confirmed (someone may have signed up with the address and a password without owning it), the address becomes confirmed, **the old password is removed and every open session is ended**. If the email is already linked to a different Google person, sign-in is refused.
- **New email**: a new family with the usual 30-day trial, email already confirmed, no password (`password_hash = '!'`, which never matches). A device's running trial and a friend's invite code carry over, like the sign-up form. The "New sign-ups" flag pauses this too.
- **Admins are excluded.** An email in `ADMIN_EMAILS` is refused at the callback whether or not the account exists, and an already-linked account that later becomes an admin's is refused too. Admins keep signing in with email and password.
- **Class student accounts** never use it.
- **No password?** A Google-only account can ask for a link to add a password (Account > Security, or "Forgot your password?"). Deleting such an account asks for the email address and needs a sign-in from the last 30 minutes.
- **Not offered** in the iPhone and iPad app (Google refuses sign-in inside an embedded browser; `isIosApp`). The Android app opens Chrome, where it works.
- Switch it off any time in the admin panel (Flags > "Google sign-in"). The button disappears at once.

## One-time setup (the owner's Google account)

1. Open the Google Cloud console (`console.cloud.google.com`), create a project (for example "Gradelings") or pick one.
2. Go to **Google Auth Platform** (menu > APIs & Services > OAuth consent screen) and click **Get started**:
   - App name: `Gradelings`; user support email: your support address.
   - **Audience: External.**
   - Contact email: your address. Agree to the user data policy and create.
3. **Branding**: set the app home page `https://gradelings.com`, privacy policy `https://gradelings.com/privacy/`, terms `https://gradelings.com/terms/`, and add `gradelings.com` under authorized domains. Skip the logo for now: a logo triggers a brand review that can take days, and the consent screen works without one.
4. **Data Access**: add only the scopes `openid` and `.../auth/userinfo.email` (shown as "See your primary Google Account email address"). These are non-sensitive, so no Google security review is needed.
5. **Audience**: under Publishing status click **Publish app** so it is **In production**. While it says "Testing", only listed test users can sign in. Non-sensitive scopes publish straight away.
6. **Clients > Create client**: Application type **Web application**, name `Gradelings web`.
   - Authorized JavaScript origins: leave empty (the flow is server-side).
   - Authorized redirect URIs, **exactly, with the trailing slash**:
     - `https://gradelings.com/api/auth/google/callback/`
     - `http://localhost:3000/api/auth/google/callback/` (optional, for local testing)
   - Create, then copy the **Client ID** and **Client secret** (or download the JSON).
7. In Vercel (Project > Settings > Environment Variables), add for **Production**:
   - `GOOGLE_CLIENT_ID` = the client ID (`…apps.googleusercontent.com`)
   - `GOOGLE_CLIENT_SECRET` = the client secret (mark it Sensitive)
   - Check that `NEXT_PUBLIC_SITE_URL` is the same origin you registered (`https://gradelings.com`, not `www`, unless that is what you registered). The callback address is built from it.
   - Redeploy. The buttons appear once both variables are set; with either missing, nothing shows and nothing breaks.
8. Try it on the live site in a private window: Parent area > Account > Continue with Google, and `/teachers/`.

Google doesn't allow wildcard redirect URIs, so Vercel preview deployments can't sign in with Google unless you register their exact address.

## If it doesn't work

- **`redirect_uri_mismatch`** from Google: the registered URI and `NEXT_PUBLIC_SITE_URL` + `/api/auth/google/callback/` differ (scheme, `www`, or the trailing slash).
- **"Access blocked: this app's request is invalid"** or only some people can sign in: the app is still in Testing; publish it (step 5).
- **The button doesn't show**: one of the two variables is missing on that environment, the flag is off, or the page is inside the iPhone/iPad app.
- **"We couldn't finish signing you in with Google"** appears after returning: the state cookie was lost (cookies blocked, or more than 10 minutes passed), or Google's token call failed. Check the function logs for `/api/auth/google/callback/`.
- To rotate the secret, create a new one in the console, update `GOOGLE_CLIENT_SECRET`, redeploy, then delete the old one.
