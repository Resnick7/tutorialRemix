import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useFetcher } from "@remix-run/react";

import invariant from "tiny-invariant";

import { getContact, updateContact, ContactRecord } from "../data";
import { Favorite } from "~/components/favorite";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};

export function isDeleted(contact: ContactRecord) {
  const fetcher = useFetcher();
  const isDeleted = fetcher.formData
    ? fetcher.formData.get("isDeleted") === "true"
    : contact.isDeleted;
}

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();
  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact?.first} ${contact?.last} avatar`}
          key={contact?.avatar}
          src={contact?.avatar}
        />
      </div>

      <div>
        <h1>
          {contact?.first || contact?.last ? (
            <>
              {contact?.first} {contact?.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact?.twitter ? (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact?.notes ? <p>{contact?.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            /*Cambiar onSubmit para que realice el borrado lógico (cambie la característica isDeleted a true) */
            onSubmit={(event) => {
              isDeleted(contact);
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
