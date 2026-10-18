# RFQ — Danh sách và chi tiết RFQ

[Chỉ mục](../README.md) · [Kế hoạch](../test-plan.md) · [Dữ liệu](../test-data.md)

Phạm vi: `/rfqs; /rfqs/[id]`. Tổng: 14 ca. Kết quả thực thi xem từng ca và báo cáo execution; Not run có thể là ca mới kiểm chứng một phần.

Điều kiện chung: User A có DS-RFQ, user B sở hữu record khác; fixture 21 record, pageSize10; dùng backend sandbox hoặc HTTP mock cho frontend.

## RFQ-001 — Tải danh sách theo user

- **Yêu cầu:** `RFQ.LIST`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** DS-RFQ; page1,total21

**Bước thực hiện**

1. Đăng nhập A.
2. Mở danh sách.

**Kết quả mong đợi:** GET /rfqs?page=1&pageSize=10 có Bearer; đúng10 record, total21; không dùng dữ liệu người dùng B.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra list/next-page/detail/ID validation hoặc mapping; chưa thực thi trọn các trạng thái và tổ hợp của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-001` trong `execution/results.json`.

## RFQ-002 — Phân trang đầu, giữa và cuối

- **Yêu cầu:** `RFQ.PAGING`
- **Ưu tiên / loại / mức:** P1 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page1/2/3; total21

**Bước thực hiện**

1. Chọn Next tới trang cuối.
2. Previous về đầu.

**Kết quả mong đợi:** URL page và request đồng bộ; count1–10,11–20,21–21; Previous/Next disabled đúng biên; dữ liệu trang trước chỉ là placeholder khi đang fetch.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra list/next-page/detail/ID validation hoặc mapping; chưa thực thi trọn các trạng thái và tổ hợp của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-002` trong `execution/results.json`.

## RFQ-003 — Page query không hợp lệ

- **Yêu cầu:** `RFQ.PAGING`
- **Ưu tiên / loại / mức:** P1 / Boundary / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** page=0,-1,abc,1.5

**Bước thực hiện**

1. Mở từng query.
2. Xem request.

**Kết quả mong đợi:** Fallback1; không crash. page rất lớn hợp lệ theo schema cần backend xử lý rỗng, không hiển thị count sai.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-003` trong `execution/results.json`.

## RFQ-004 — Loading, empty và error

- **Yêu cầu:** `RFQ.STATE`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** GET /rfqs chậm, items=[], 500

**Bước thực hiện**

1. Reset cache và thử từng response.
2. Quan sát UI.

**Kết quả mong đợi:** Skeleton lúc pending; empty message chỉ với response rỗng hợp lệ; lỗi có Alert, không giả empty.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-004` trong `execution/results.json`.

## RFQ-005 — Lỗi refresh khi đang có dữ liệu

- **Yêu cầu:** `RFQ.STATE`
- **Ưu tiên / loại / mức:** P0 / Reliability / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Đã tải page1; refetch=500 hoặc401

**Bước thực hiện**

1. Làm cache stale.
2. Refetch thất bại.

**Kết quả mong đợi:** Không gọi dữ liệu stale là mới; lỗi hiển thị; 401 sau refresh thất bại xóa private data, không giữ PII ở màn hình.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-005` trong `execution/results.json`.

## RFQ-006 — Các trạng thái và fallback

- **Yêu cầu:** `RFQ.STATUS`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** status=Submitted,Quoted,Pending,Declined,Accepted,Expired,Cancelled; unknown=NewBackendStatus

**Bước thực hiện**

1. Render từng status.
2. Lặp locale vi.

**Kết quả mong đợi:** Trim/normalize dấu cách/underscore/casing theo source; status lạ vẫn có label và không crash; màu không là tín hiệu duy nhất.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-006` trong `execution/results.json`.

## RFQ-007 — Detail đúng ID và link

- **Yêu cầu:** `RFQ.DETAIL`
- **Ưu tiên / loại / mức:** P0 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** ID GUID hợp lệ thuộc A

**Bước thực hiện**

1. Click link số record.
2. Reload URL detail.

**Kết quả mong đợi:** GET /rfqs/<GUID> đúng record; breadcrumb có số tương ứng; route uppercase không làm backend sai lookup GUID.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Pass. ID/detail link và request detail được xác minh bằng response tổng hợp.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-007` trong `execution/results.json`.

## RFQ-008 — ID sai và record không tồn tại

- **Yêu cầu:** `RFQ.DETAIL`
- **Ưu tiên / loại / mức:** P1 / Negative / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** id=OR-3000 hoặc chuỗi bất kỳ; GUID404

**Bước thực hiện**

1. Mở detail từng ID.
2. Theo dõi HTTP.

**Kết quả mong đợi:** ID sai reject trước HTTP; GUID không tồn tại hiển thị lỗi và link về danh sách; không crash toàn layout.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra list/next-page/detail/ID validation hoặc mapping; chưa thực thi trọn các trạng thái và tổ hợp của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-008` trong `execution/results.json`.

## RFQ-009 — Không xem record người khác

- **Yêu cầu:** `RFQ.AUTHZ`
- **Ưu tiên / loại / mức:** P0 / Functional / API + E2E
- **Cơ sở kỳ vọng:** Security target (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** ID thuộc B; token A hoặc guest

**Bước thực hiện**

1. Đổi URL detail sang record B.
2. Gọi API trực tiếp với A/không token.

**Kết quả mong đợi:** Backend trả403/404 theo policy; không gửi dữ liệu B cho A. UI error phù hợp; không suy ra quyền chỉ từ route.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất API + E2E | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Blocked. Cần backend/sandbox và ít nhất hai user hoặc HTTPS để kiểm tra authorization, session policy/HttpOnly và validation nội dung file. Frontend mock không chứng minh được các thuộc tính này.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-009` trong `execution/results.json`.

## RFQ-010 — Đổi page/detail nhanh

- **Yêu cầu:** `RFQ.RACE`
- **Ưu tiên / loại / mức:** P1 / Concurrency / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Response trang2 chậm hơn3; ID A chậm hơn B

**Bước thực hiện**

1. Điều hướng liên tiếp.
2. Resolve đảo thứ tự.

**Kết quả mong đợi:** Query key tách page/id; UI cuối khớp URL; AbortSignal tới service; response cũ không thay record mới.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-010` trong `execution/results.json`.

## RFQ-011 — Reject response sai contract

- **Yêu cầu:** `RFQ.SCHEMA`
- **Ưu tiên / loại / mức:** P1 / Contract / Unit
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items malformed; quantity0; total âm; date không ISO; GUID sai

**Bước thực hiện**

1. Gửi từng fixture sai vào service.

**Kết quả mong đợi:** Reject trước render và hiển thị error state; không format ngày/tiền từ dữ liệu sai.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Unit | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra list/next-page/detail/ID validation hoặc mapping; chưa thực thi trọn các trạng thái và tổ hợp của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-011` trong `execution/results.json`.

## RFQ-012 — Bảng desktop và card mobile

- **Yêu cầu:** `RFQ.RESPONSIVE`
- **Ưu tiên / loại / mức:** P2 / Functional / Browser
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** Viewport390,768,1280; chuỗi dài

**Bước thực hiện**

1. Mở list và detail.
2. So record/links ở hai layout.

**Kết quả mong đợi:** Cùng dữ liệu và hành động, không mất số/ngày/status; cuộn bảng trong vùng cần thiết, không tràn toàn trang.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Browser | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-012` trong `execution/results.json`.

## RFQ-013 — Items, specNote và remarks nullable

- **Yêu cầu:** `RFQ.ITEMS`
- **Ưu tiên / loại / mức:** P2 / Functional / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** items=[] hoặc2; specNote/notes/adminRemarks/supplierRemarks=null/whitespace

**Bước thực hiện**

1. Mở detail từng fixture.

**Kết quả mong đợi:** Requested count đúng; empty message khi không item; specNote fallback; remarks trống có no remarks; không hiện literal null.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. MỘT PHẦN: Đã kiểm tra list/next-page/detail/ID validation hoặc mapping; chưa thực thi trọn các trạng thái và tổ hợp của ca.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-013` trong `execution/results.json`.

## RFQ-014 — Escape dữ liệu remarks

- **Yêu cầu:** `RFQ.REMARKS`
- **Ưu tiên / loại / mức:** P1 / Security / Integration
- **Cơ sở kỳ vọng:** Source (xem định nghĩa trong kế hoạch).
- **Dữ liệu:** notes="<img src=x onerror=alert(1)>"; source rất dài

**Bước thực hiện**

1. Mở RFQ detail với fixture độc hại.

**Kết quả mong đợi:** Nội dung là text, script không chạy; không tràn card; supplier/userID không bị cắt mất khả năng tra cứu.

**Nguồn truy vết:** [src/features/rfqs/api/rfqs.service.ts:14](../../../src/features/rfqs/api/rfqs.service.ts#L14), [src/features/rfqs/api/use-rfqs-query.ts:7](../../../src/features/rfqs/api/use-rfqs-query.ts#L7), [src/features/rfqs/components/rfqs-screen.tsx:17](../../../src/features/rfqs/components/rfqs-screen.tsx#L17).

**Automation:** Đề xuất Integration | Test liên quan, chưa xác nhận phủ ca: src/features/rfqs/api/rfqs.service.test.ts.

**Thực thi:** Not run. Chưa thực thi đầy đủ các bước/expected của ca. Các test liên quan đã chạy, nhưng chưa có assertion đủ để gán Pass.

**Bằng chứng chạy:** [Báo cáo và ledger](../execution/README.md); tìm `RFQ-014` trong `execution/results.json`.
