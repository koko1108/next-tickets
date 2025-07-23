import { Suspense } from "react"; // 引入 React 的 Suspense 元件，用於處理非同步載入
import TicketList from "./TicketList"; // 引入顯示票券列表的元件
import Loading from "../loading"; // 引入自訂的載入中畫面元件
import Link from "next/link";

export default function Tickets() {
  return (
    <>
      {/* 頁面標題與描述 */}
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Tickets
          </h2>
          <p className="mt-4 max-w-md text-gray-500">Currently open tickets.</p>
        </div>

        <Link href="/tickets/create">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </div>
      {/* 
        使用 Suspense 包住 TicketList，當 TicketList 資料還沒載入完成時，
        會先顯示 Loading 畫面，等資料載入好後才顯示真正內容
        這個方式可以只針對 TicketList 的載入狀態進行處理
      */}
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </>
  );
}
