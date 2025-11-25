import { useMutation } from "@tanstack/react-query"

// Custom hook để dùng mutation gọn hơn
export const useMutationHooks = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: fnCallback   // ✅ không gọi fnCallback(), chỉ truyền function
  })
  return mutation
}
