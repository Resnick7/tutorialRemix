import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useFetcher } from "@remix-run/react";
import { ContactRecord } from "../data";

import { deleteContact } from "../data";

export function isDeleted(contact: ContactRecord) {
  const fetcher = useFetcher();
  return fetcher.formData
    ? fetcher.formData.get("isDeleted") === "true"
    : contact.isDeleted;
}

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  await deleteContact(params.contactId);
  return redirect("/");
};
