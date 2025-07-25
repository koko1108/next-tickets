// 從 Next.js 導入 notFound，用來顯示 404 頁面
import { notFound } from "next/navigation";

// 允許網址出現任意 id，支援動態產生頁面
export const dynamicParams = true; // 告訴 Next.js 這個動態路由可以接受任意參數

// 動態設定網頁 metadata（如 title），根據 ticket id 取得資料
export async function generateMetadata({ params }) {
  const id = params.id

  // 取得指定 id 的 ticket 資料
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  const ticket = await res.json()
 
  // 回傳動態網頁標題
  return {
    title: `Dojo Helpdesk | ${ticket.title}`
  }
}

// 產生所有已知 ticket id 的靜態頁面（build 時執行）
export async function generateStaticParams() {
  // 取得所有 ticket 資料
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  // 回傳所有 id，讓 Next.js 預先產生這些頁面
  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

// 取得單一 ticket 詳細資料
async function getTicket(id) {
  // 可模擬延遲（註解掉）
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // 向 API 取得指定 id 的 ticket，並設定 revalidate（ISR）
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60, // 60 秒後自動重新抓取
    },
  });

  // 如果找不到資料，顯示 404 頁面
  if (!res.ok) {
    notFound();
  }

  // 回傳 ticket 資料
  return res.json();
}

// 頁面元件：顯示 ticket 詳細資料
export default async function TicketDetails({ params }) {
  // 取得網址參數 id
  // const id = params.id
  const ticket = await getTicket(params.id);

  // 回傳 ticket 詳細內容
  return (
    <>
      {/* 頁面標題 */}
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
        Ticket Details
      </h2>

      <div className="flow-root">
        <dl className="m-3 divide-y divide-gray-200 text-sm">
          {/* 標題區塊 */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Title</dt>
            <dd className="text-gray-700 sm:col-span-2">
              <h3>{ticket.title}</h3>
            </dd>
          </div>

          {/* 建立者區塊 */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Created by</dt>
            <dd className="text-gray-700 sm:col-span-2">{ticket.user_email}</dd>
          </div>

          {/* 詳細內容區塊 */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Detail</dt>
            <dd className="text-gray-700 sm:col-span-2">{ticket.body}</dd>
          </div>

          {/* 優先權區塊 */}
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
