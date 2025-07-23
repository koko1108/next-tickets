import Link from "next/link"

async function getTickets() {
  // imitate delay
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {tickets.map((ticket) => (
        <article
          key={ticket.id}
          className=" max-w-80 rounded-xl border-2 border-gray-100 bg-white"
        >
          <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
            <Link href={`/tickets/${ticket.id}`}>
              <h3 className="font-medium sm:text-lg">{ticket.title}</h3>
              <p className="line-clamp-2 text-sm text-gray-700">
                {ticket.body.slice(0, 200)}...
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <strong
              className={`-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl px-3 ${
                ticket.priority === "low"
                  ? "bg-green-600"
                  : ticket.priority === "medium"
                  ? "bg-amber-600"
                  : ticket.priority === "high"
                  ? "bg-red-600"
                  : ""
              } py-1.5 text-white`}
            >
              <span className="text-[10px] font-medium sm:text-xs`">
                {ticket.priority} priority
              </span>
            </strong>
          </div>
        </article>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </div>
  );
}
