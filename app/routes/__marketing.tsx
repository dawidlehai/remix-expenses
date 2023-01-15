import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import marketingStyles from "~/styles/marketing.css";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export const loader: LoaderFunction = ({ request }) =>
  getUserFromSession(request);

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: marketingStyles },
];

export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=3600",
});
