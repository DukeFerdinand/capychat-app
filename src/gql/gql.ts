/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n    query GetUser($email: String!) {\n        findUserByEmail(email: $email) {\n            id\n            username\n            email\n            displayName\n        }\n    }\n": types.GetUserDocument,
};

export function graphql(source: "\n    query GetUser($email: String!) {\n        findUserByEmail(email: $email) {\n            id\n            username\n            email\n            displayName\n        }\n    }\n"): (typeof documents)["\n    query GetUser($email: String!) {\n        findUserByEmail(email: $email) {\n            id\n            username\n            email\n            displayName\n        }\n    }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;