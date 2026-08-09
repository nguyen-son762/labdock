"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="max-w-xl space-y-4 py-10">
      <Alert>Dashboard không thể hiển thị lúc này. Vui lòng thử lại.</Alert>
      <Button onClick={reset}>Tải lại Dashboard</Button>
    </div>
  );
}
