import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { Form, useNavigate } from "@remix-run/react";

import { createContact, isEmpty, avatarIncomplete } from "~/data";

import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const contactData = Object.fromEntries(formData) as Record<string, string>;

  if (isEmpty(contactData)) {
    throw json("Está queriendo guardar un contacto vacío");
  }

  if (avatarIncomplete(contactData)) {
    contactData.avatar = "http://placekitten.com/400/400";
  }

  const contact = await createContact(contactData);

  return redirect(`/contacts/${contact.id}`);
};

export default function EditContact() {
  const navigate = useNavigate();

  return (
    <Form id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          aria-label="First name"
          name="first"
          type="text"
          placeholder="First"
          id="first"
        />
        <input
          aria-label="Last name"
          name="last"
          placeholder="Last"
          type="text"
          id="last"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input name="twitter" placeholder="@jack" type="text" id="twitter" />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
          id="avatar"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>

        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
