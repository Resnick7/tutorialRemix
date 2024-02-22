import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { Form, useNavigate } from "@remix-run/react";

import { createContact } from "../data";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const contact = await createContact(updates);

  /*  Comprobar si el Form está vacío antes de guardar el contacto
  if (!isEmpty(updates)){}
  */

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
