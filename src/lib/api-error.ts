import axios from "axios";
import { z } from "zod";

const apiErrorPayloadSchema = z.object({
  message: z.string().min(1),
});

const statusMessages: Readonly<Record<number, string>> = {
  400: "Yêu cầu chưa hợp lệ. Vui lòng kiểm tra lại thông tin.",
  401: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  403: "Bạn không có quyền thực hiện thao tác này.",
  404: "Không tìm thấy dữ liệu được yêu cầu.",
  409: "Dữ liệu đã thay đổi. Vui lòng tải lại và thử lại.",
  429: "Bạn thao tác quá nhanh. Vui lòng thử lại sau.",
};

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "Đã xảy ra lỗi không xác định. Vui lòng thử lại.";
  }

  const payload = apiErrorPayloadSchema.safeParse(error.response?.data);

  if (payload.success) {
    return payload.data.message;
  }

  const status = error.response?.status;

  if (status && statusMessages[status]) {
    return statusMessages[status];
  }

  if (error.code === "ERR_CANCELED") {
    return "Yêu cầu đã được hủy.";
  }

  return "Không thể kết nối đến hệ thống. Vui lòng thử lại sau.";
}
