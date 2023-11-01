import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useTweet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTweet = async ({
    handle,
    content,
    replyToTweetId,
    from_date,
    to_date,
  }: {
    handle: string;
    content: string;
    replyToTweetId?: number;
    from_date?: string;     // 考量到這個資訊只有在創建活動時需要顯示，留言區的tweets都不用輸入此資料
    to_date?: string;       // 考量到這個資訊只有在創建活動時需要顯示，留言區的tweets都不用輸入此資料
  }) => {
    setLoading(true);

    const res = await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({
        handle,
        content,
        replyToTweetId,
        from_date,
        to_date,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  return {
    postTweet,
    loading,
  };
}
