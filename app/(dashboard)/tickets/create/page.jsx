import CreateForm from './CreateForm'

export default async function CreateTicket() {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Open a New Ticket</h2>
      <CreateForm />
    </>
  )
}