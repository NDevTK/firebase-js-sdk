/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { UserCredential } from '../../model/public_types';
import { FirebaseError } from '@firebase/util';

import { SignInWithIdpResponse } from '../../api/authentication/idp';
import { TaggedWithTokenResponse } from '../../model/id_token';
import { UserCredentialInternal } from '../../model/user';
import { OAuthCredential } from '../credentials/oauth';
import { BaseOAuthProvider } from './oauth';
import { ProviderId, SignInMethod } from '../../model/enums';

/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GOOGLE.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new GoogleAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('profile');
 * provider.addScope('email');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Google Access Token.
 *   const credential = GoogleAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new GoogleAuthProvider();
 * provider.addScope('profile');
 * provider.addScope('email');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Google Access Token.
 * const credential = GoogleAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 *
 * @public
 */
export class GoogleAuthProvider extends BaseOAuthProvider {
  /** Always set to {@link SignInMethod}.GOOGLE. */
  static readonly GOOGLE_SIGN_IN_METHOD: 'google.com' = SignInMethod.GOOGLE;
  /** Always set to {@link ProviderId}.GOOGLE. */
  static readonly PROVIDER_ID: 'google.com' = ProviderId.GOOGLE;

  constructor() {
    super(ProviderId.GOOGLE);
    this.addScope('profile');
  }

  /**
   * Creates a credential for Google. At least one of ID token and access token is required.
   *
   * @example
   * ```javascript
   * // \`googleUser\` from the onsuccess Google Sign In callback.
   * const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param idToken - Google ID token.
   * @param accessToken - Google access token.
   */
  static credential(
    idToken?: string | null,
    accessToken?: string | null
  ): OAuthCredential {
    return OAuthCredential._fromParams({
      providerId: GoogleAuthProvider.PROVIDER_ID,
      signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      idToken,
      accessToken
    });
  }

  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromResult(
    userCredential: UserCredential
  ): OAuthCredential | null {
    return GoogleAuthProvider.credentialFromTaggedObject(
      userCredential as UserCredentialInternal
    );
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromError(error: FirebaseError): OAuthCredential | null {
    return GoogleAuthProvider.credentialFromTaggedObject(
      (error.customData || {}) as TaggedWithTokenResponse
    );
  }

  private static credentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }: TaggedWithTokenResponse): OAuthCredential | null {
    if (!tokenResponse) {
      return null;
    }

    const { oauthIdToken, oauthAccessToken } =
      tokenResponse as SignInWithIdpResponse;
    if (!oauthIdToken && !oauthAccessToken) {
      // This could be an oauth 1 credential or a phone credential
      return null;
    }

    try {
      return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
    } catch {
      return null;
    }
  }
}
