"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn, validateContent } from "@/lib/utils";
// import { sql } from "drizzle-orm";
import { ne } from "drizzle-orm";

import { tweetsTable } from "@/db/schema";
import { db } from "@/db";
import { Maximize } from "lucide-react";

type Jump_ID = {
	tweets_len: number;
};

export default function AddNewTweet({
	tweets_len,
}: Jump_ID) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
  const searchParams = useSearchParams();
	const contentInputRef = useRef<HTMLInputElement>(null);
	const fromInputRef = useRef<HTMLInputElement>(null);
	const toInputRef = useRef<HTMLInputElement>(null);
	const [contentError, setContentError] = useState(false);
	const [fromError, setFromError] = useState(false);
	const [toError, setToError] = useState(false);

	useEffect(() => {
    const content = searchParams.get("content");
    const from = searchParams.get("from");	// 還沒處理
		const to = searchParams.get("to");			// 還沒處理
    // if any of the username or handle is not valid, open the dialog
    setDialogOpen(!validateContent(content));
  }, [searchParams]);

	// 不確定是不是這樣合併，見TweetInput.tsxs
	const { handle } = useUserInfo();
	const { postTweet, loading } = useTweet();

	const handleSave = async () => {
		const content = contentInputRef.current?.value;
		const from = fromInputRef.current?.value;	// 還沒處理
		const to = toInputRef.current?.value;			// 還沒處理

		const newContentError = !validateContent(content);
		setContentError(newContentError);
		// const fromError = 
		// const toError = 

		if(newContentError){
			return false;
		}
		
		if (!content) return;
    if (!handle) return;
		
		try {
			await postTweet({
				handle,
				content,
			});
			setDialogOpen(false);
			contentInputRef.current.value="";
		} catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
	}

	const handleTweet = async () => {
		const username = searchParams.get("username");
    const handle = searchParams.get("handle");
    const content = contentInputRef.current?.value;
    if (!content) {
			alert("請輸入標題!!!")
			return;
		}	
    if (!handle) return;

    try {
      await postTweet({
        handle,
        content,
      });

			// 新增完活動後要直接跳轉進去該頁面，有需要在這裡處理??但這邊不能call db!!
			// const jump_to_id = 14;
			const params = new URLSearchParams(searchParams);
   		params.set("username", username!);
    	params.set("handle", handle!);
			router.push(`${pathname}${"tweet/"}${tweets_len+1}?${params.toString()}`);
			
			setDialogOpen(false);
			contentInputRef.current.value="";
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
  };

	const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      // if handleSave returns false, it means that the input is invalid, so we
      // don't want to close the dialog
      setDialogOpen(false);
    }
  };

  return(
		<>
			<button onClick={() => setDialogOpen(true)}>
				新增活動
			</button>
			<Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>建立活動</DialogTitle>
						<DialogDescription>
							請依照格式輸入活動標題、活動起始&結束時間
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								標題
							</Label>
							<Input
								placeholder="請輸入活動標題"
								defaultValue={searchParams.get("content") ?? ""}
								className={cn(contentError && "border-red-500", "col-span-3")}
								ref={contentInputRef}
							/>
							{contentError && (
								<p className="col-span-3 col-start-2 text-xs text-red-500">
									標題不可為空白，請重新輸入。
								</p>
							)}
						</div>
						{/* <div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Handle
							</Label>
							<div className="col-span-3 flex items-center gap-2">
								<span>@</span>
								<Input
									placeholder="web.prog"
									defaultValue={searchParams.get("handle") ?? ""}
									className={cn(handleError && "border-red-500")}
									ref={handleInputRef}
								/>
							</div>
							{handleError && (
								<p className="col-span-3 col-start-2 text-xs text-red-500">
									Invalid handle, use only{" "}
									<span className="font-mono">[a-z0-9\._-]</span>, must be between
									1 and 25 characters long.
								</p>
							)}
						</div> */}
					</div>
					<DialogFooter>
						<Button onClick={handleTweet}>新增</Button>
					</DialogFooter>
				</DialogContent>
    	</Dialog>
		</>
  );
}