import { notFound } from "next/navigation";

export const dynamicParams = true; // default val = true

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id) {
  // imitate delay
//   await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id);

  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
        Ticket Details
      </h2>

      <div className="flow-root">
        <dl className="m-3 divide-y divide-gray-200 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Title</dt>

            <dd className="text-gray-700 sm:col-span-2">
              <h3>{ticket.title}</h3>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Created by</dt>

            <dd className="text-gray-700 sm:col-span-2">{ticket.user_email}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Detail</dt>

            <dd className="text-gray-700 sm:col-span-2">{ticket.body}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">priority</dt>

            <dd className="text-gray-700 sm:col-span-2">
              {ticket.priority} priority
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
