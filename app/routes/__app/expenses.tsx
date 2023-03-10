import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import type { Expense } from "~/types";
import { requireUserSession } from "~/data/auth.server";

export const meta: MetaFunction = () => ({
  title: "Expenses List - RemixExpenses",
  description:
    "All your expenses in one place. View, edit or delete expenses in this comfortable list view.",
});

export default function ExpensesLayout() {
  const expenses: Expense[] = useLoaderData();
  const hasExpenses = expenses?.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  return expenses;
};
