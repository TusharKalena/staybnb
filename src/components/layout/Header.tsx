import { AirbnbLogo } from "./AirbnbLogo";
import { Container } from "./Container";
import { LanguageMenu } from "./LanguageMenu";
import { ProfileMenu } from "./ProfileMenu";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <Container className="grid h-[70px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
        <AirbnbLogo />
        <SearchBar />
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-disabled="true"
            className="hidden h-10 cursor-pointer rounded-full px-3 text-sm font-semibold transition-colors duration-200 hover:bg-muted lg:block"
          >
            Become a host
          </button>
          <LanguageMenu />
          <ProfileMenu />
        </div>
      </Container>
    </header>
  );
}