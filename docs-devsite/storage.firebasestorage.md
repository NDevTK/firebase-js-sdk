Project: /docs/reference/js/_project.yaml
Book: /docs/reference/_book.yaml
page_type: reference

{% comment %}
DO NOT EDIT THIS FILE!
This is generated by the JS SDK team, and any local changes will be
overwritten. Changes should be made in the source code at
https://github.com/firebase/firebase-js-sdk
{% endcomment %}

# FirebaseStorage interface
A Firebase Storage instance.

<b>Signature:</b>

```typescript
export interface FirebaseStorage extends _FirebaseService 
```
<b>Extends:</b> \_FirebaseService

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [app](./storage.firebasestorage.md#firebasestorageapp) | [FirebaseApp](./app.firebaseapp.md#firebaseapp_interface) | The [FirebaseApp](./app.firebaseapp.md#firebaseapp_interface) associated with this <code>FirebaseStorage</code> instance. |
|  [maxOperationRetryTime](./storage.firebasestorage.md#firebasestoragemaxoperationretrytime) | number | The maximum time to retry operations other than uploads or downloads in milliseconds. |
|  [maxUploadRetryTime](./storage.firebasestorage.md#firebasestoragemaxuploadretrytime) | number | The maximum time to retry uploads in milliseconds. |

## FirebaseStorage.app

The [FirebaseApp](./app.firebaseapp.md#firebaseapp_interface) associated with this `FirebaseStorage` instance.

<b>Signature:</b>

```typescript
readonly app: FirebaseApp;
```

## FirebaseStorage.maxOperationRetryTime

The maximum time to retry operations other than uploads or downloads in milliseconds.

<b>Signature:</b>

```typescript
maxOperationRetryTime: number;
```

## FirebaseStorage.maxUploadRetryTime

The maximum time to retry uploads in milliseconds.

<b>Signature:</b>

```typescript
maxUploadRetryTime: number;
```