"use client"

import { useRef } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function SearchBar() {
	const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
	const keywordInputRef = useRef<HTMLInputElement>(null);

	const handleSave = () => {
    var keyword = keywordInputRef.current?.value;
		if(!keyword){
			keyword = "";
		}

    const params = new URLSearchParams(searchParams);
    params.set("keyword", keyword!);
    router.push(`${pathname}?${params.toString()}`);

    return true;
  };

	return (
	<>
		<Input 
			placeholder="搜尋想參加的活動"
			defaultValue={""}
			ref={keywordInputRef}
		/>
		<Button onClick={handleSave}>搜尋</Button>
	</>
	);
}