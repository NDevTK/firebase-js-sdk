Project: /docs/reference/js/_project.yaml
Book: /docs/reference/_book.yaml
page_type: reference

{% comment %}
DO NOT EDIT THIS FILE!
This is generated by the JS SDK team, and any local changes will be
overwritten. Changes should be made in the source code at
https://github.com/firebase/firebase-js-sdk
{% endcomment %}

# MultiFactorUser interface
An interface that defines the multi-factor related properties and operations pertaining to a [User](./auth.user.md#user_interface)<!-- -->.

<b>Signature:</b>

```typescript
export interface MultiFactorUser 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [enrolledFactors](./auth.multifactoruser.md#multifactoruserenrolledfactors) | [MultiFactorInfo](./auth.multifactorinfo.md#multifactorinfo_interface)<!-- -->\[\] | Returns a list of the user's enrolled second factors. |

## Methods

|  Method | Description |
|  --- | --- |
|  [enroll(assertion, displayName)](./auth.multifactoruser.md#multifactoruserenroll) | Enrolls a second factor as identified by the [MultiFactorAssertion](./auth.multifactorassertion.md#multifactorassertion_interface) for the user. |
|  [getSession()](./auth.multifactoruser.md#multifactorusergetsession) | Returns the session identifier for a second factor enrollment operation. This is used to identify the user trying to enroll a second factor. |
|  [unenroll(option)](./auth.multifactoruser.md#multifactoruserunenroll) | Unenrolls the specified second factor. |

## MultiFactorUser.enrolledFactors

Returns a list of the user's enrolled second factors.

<b>Signature:</b>

```typescript
readonly enrolledFactors: MultiFactorInfo[];
```

## MultiFactorUser.enroll()

Enrolls a second factor as identified by the [MultiFactorAssertion](./auth.multifactorassertion.md#multifactorassertion_interface) for the user.

On resolution, the user tokens are updated to reflect the change in the JWT payload. Accepts an additional display name parameter used to identify the second factor to the end user. Recent re-authentication is required for this operation to succeed. On successful enrollment, existing Firebase sessions (refresh tokens) are revoked. When a new factor is enrolled, an email notification is sent to the user’s email.

<b>Signature:</b>

```typescript
enroll(assertion: MultiFactorAssertion, displayName?: string | null): Promise<void>;
```

#### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  assertion | [MultiFactorAssertion](./auth.multifactorassertion.md#multifactorassertion_interface) | The multi-factor assertion to enroll with. |
|  displayName | string \| null | The display name of the second factor. |

<b>Returns:</b>

Promise&lt;void&gt;

### Example


```javascript
const multiFactorUser = multiFactor(auth.currentUser);
const multiFactorSession = await multiFactorUser.getSession();

// Send verification code.
const phoneAuthProvider = new PhoneAuthProvider(auth);
const phoneInfoOptions = {
  phoneNumber: phoneNumber,
  session: multiFactorSession
};
const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier);

// Obtain verification code from user.
const phoneAuthCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);
await multiFactorUser.enroll(multiFactorAssertion);
// Second factor enrolled.

```

## MultiFactorUser.getSession()

Returns the session identifier for a second factor enrollment operation. This is used to identify the user trying to enroll a second factor.

<b>Signature:</b>

```typescript
getSession(): Promise<MultiFactorSession>;
```
<b>Returns:</b>

Promise&lt;[MultiFactorSession](./auth.multifactorsession.md#multifactorsession_interface)<!-- -->&gt;

The promise that resolves with the [MultiFactorSession](./auth.multifactorsession.md#multifactorsession_interface)<!-- -->.

### Example


```javascript
const multiFactorUser = multiFactor(auth.currentUser);
const multiFactorSession = await multiFactorUser.getSession();

// Send verification code.
const phoneAuthProvider = new PhoneAuthProvider(auth);
const phoneInfoOptions = {
  phoneNumber: phoneNumber,
  session: multiFactorSession
};
const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier);

// Obtain verification code from user.
const phoneAuthCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);
await multiFactorUser.enroll(multiFactorAssertion);

```

## MultiFactorUser.unenroll()

Unenrolls the specified second factor.

To specify the factor to remove, pass a [MultiFactorInfo](./auth.multifactorinfo.md#multifactorinfo_interface) object (retrieved from [MultiFactorUser.enrolledFactors](./auth.multifactoruser.md#multifactoruserenrolledfactors)<!-- -->) or the factor's UID string. Sessions are not revoked when the account is unenrolled. An email notification is likely to be sent to the user notifying them of the change. Recent re-authentication is required for this operation to succeed. When an existing factor is unenrolled, an email notification is sent to the user’s email.

<b>Signature:</b>

```typescript
unenroll(option: MultiFactorInfo | string): Promise<void>;
```

#### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  option | [MultiFactorInfo](./auth.multifactorinfo.md#multifactorinfo_interface) \| string | The multi-factor option to unenroll. |

<b>Returns:</b>

Promise&lt;void&gt;

- A `Promise` which resolves when the unenroll operation is complete.

### Example


```javascript
const multiFactorUser = multiFactor(auth.currentUser);
// Present user the option to choose which factor to unenroll.
await multiFactorUser.unenroll(multiFactorUser.enrolledFactors[i])

```

