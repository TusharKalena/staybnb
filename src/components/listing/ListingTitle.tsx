import { ShareSaveActions } from "./ShareSaveActions";

interface ListingTitleProps {
  title: string;
  saved: boolean;
  onToggleSave: () => void;
}

export function ListingTitle({ title, saved, onToggleSave }: ListingTitleProps) {
  return (
    <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:mt-7">
      <h1 className="text-xl font-medium leading-6 md:text-[26px] md:font-semibold md:leading-[30px]">
        {title}
      </h1>
      <ShareSaveActions saved={saved} onToggleSave={onToggleSave} />
    </div>
  );
}
