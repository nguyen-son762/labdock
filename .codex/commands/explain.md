# /explain

## Mục tiêu

Giải thích một luồng hoặc quyết định kỹ thuật dựa trên source thực tế, phù hợp trình độ người đọc và không thay đổi code.

## Workflow

1. Xác định câu hỏi chính và phạm vi cần đọc.
2. Đọc source, config, test và call site; không suy luận chỉ từ tên file.
3. Theo dấu input -> transformation -> state/Cache -> render/output.
4. Nêu “vì sao” của Server/Client, API, state và error behavior.
5. Dùng ví dụ hoặc sơ đồ nhỏ khi quan hệ khó hiểu.
6. Phân biệt fact từ source, inference và phần chưa xác minh.
7. Kết thúc bằng rủi ro hoặc điểm mở rộng quan trọng nếu có.

## Checklist

- [ ] Giải thích bám file và hành vi thật.
- [ ] Thuật ngữ kỹ thuật giữ nguyên và được đặt trong context.
- [ ] Không khẳng định runtime behavior chưa kiểm chứng.
- [ ] Không biến câu trả lời thành review ngoài yêu cầu.
- [ ] Không sửa file hoặc chạy mutation.

## Output mẫu

```text
Product Page render Product và metadata phía Server để HTML có thể index và dùng public Cache. ProductActions là Client Component vì cần click và user session. Hook useCartMutation gọi Cart service qua axios instance, sau đó chỉ invalidate cartKeys.summary; Product Cache không bị ảnh hưởng.
```
