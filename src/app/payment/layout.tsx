import { requireRole } from "@/lib/serverApi/server";

const PaymentLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requireRole("customer");

  return <>{children}</>;
};

export default PaymentLayout;