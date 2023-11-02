import { Separator } from "@/components/ui/separator";
import { getAvatar } from "@/lib/utils";

import TimeText from "./TimeText";

type ReplyProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
  likes: number;
  createdAt: Date;
  liked?: boolean;
  // from_date?: string;
  // to_date?: string;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Reply({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  content,
  likes,
  createdAt,
  liked,
  // from_date,
  // to_date,
}: ReplyProps) {
  var joins = (!likes)? 0: likes;
  return (
    <>
      {/* <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      > */}
        <div className="w-full px-4 pt-3 transition-colors hover:bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAvatar(authorName)}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <article className="flex grow flex-col">
            <p className="font-bold">
              {authorName}
              <span className="ml-2 font-normal text-gray-400">
                @{authorHandle}
              </span>
              <time className="ml-2 font-normal text-gray-400">
                <TimeText date={createdAt} format="h:mm A · D MMM YYYY" />
              </time>
            </p>
            {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
            <article className="mt-2 whitespace-pre-wrap">{content}</article>
          </article>
        </div>
      {/* </Link> */}
      <Separator />
    </>
  );
}
