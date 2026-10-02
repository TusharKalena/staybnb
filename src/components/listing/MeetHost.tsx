import { ShieldCheck } from "lucide-react";

import type { Host, HostProfile } from "@/types/listing";

import { Avatar } from "./Avatar";
import { Section } from "./Section";

export function MeetHost({ host, profile }: { host: Host; profile: HostProfile }) {
  const stats = [
    { value: profile.reviewCount.toLocaleString("en-IN"), label: "Reviews" },
    { value: `${profile.rating}★`, label: "Rating" },
    {
      value: String(host.yearsHosting),
      label: host.yearsHosting === 1 ? "Year hosting" : "Years hosting",
    },
  ];

  return (
    <Section id="host" title="Meet your host" className="py-12">
      <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-20">
        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 rounded-3xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col items-center text-center">
              <img
                src={host.avatar}
                alt=""
                width={104}
                height={104}
                className="size-26 rounded-full object-cover"
              />
              <h3 className="mt-3 text-2xl font-bold">{host.name}</h3>
              <p className="text-sm">Host</p>
            </div>
            <dl className="divide-y divide-border">
              {stats.map(({ value, label }) => (
                <div key={label} className="py-3 first:pt-0 last:pb-0">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-xl font-bold leading-6">{value}</dd>
                  <dd aria-hidden="true" className="text-[10px] font-semibold">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="mt-8 space-y-3">
            {profile.facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon aria-hidden="true" className="size-6" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Co-Hosts</h3>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.coHosts.map((name) => (
              <li key={name} className="flex items-center gap-3">
                <Avatar name={name} className="size-9 text-sm" />
                {name}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-lg font-semibold">Host details</h3>
          <p className="mt-3">Response rate: {profile.responseRate}</p>
          <p>{profile.responseTime}</p>
          <button
            type="button"
            className="mt-6 h-12 cursor-pointer rounded-lg bg-muted px-6 font-semibold transition-colors hover:bg-border"
          >
            Message host
          </button>
          <p className="mt-8 flex items-start gap-3 border-t border-border pt-6 text-xs">
            <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-primary" />
            To help protect your payment, always use Airbnb to send money and communicate with
            hosts.
          </p>
        </div>
      </div>
    </Section>
  );
}
