import LiveBlocksProvider from "@/components/ui/LiveBlocksProvider"

function PageLayout ({children}:{ children: React.ReactNode }){
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>
};
export default PageLayout;
