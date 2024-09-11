import LiveBlocksProvider from "@/components/ui/LiveBlocksProvider"

const PageLayout = ({children}:{ children: React.ReactNode }) => {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>
};
export default PageLayout;
