import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import invariant from "tiny-invariant";

import { addFavorite, getContact, updateContact } from "../data";
import { Favorite } from "~/components/favorite";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return addFavorite(params.contactId);
};

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

          <Form action="destroy" method="post">
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
