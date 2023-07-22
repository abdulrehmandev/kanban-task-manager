import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import TopNavBar from "@/components/TopNavBar";

const DashbaordLayout = ({ children }) => {
  return (
    <section>
      <TopNavBar />
      <SideBar />
      {children}
      <Footer />
    </section>
  );
};

export default DashbaordLayout;
