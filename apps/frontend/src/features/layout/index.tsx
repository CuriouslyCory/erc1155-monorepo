import { Header } from "./components/header";
import { Footer } from "./components/footer";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <section className="grid min-h-screen grid-rows-a1a">
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
};

export { Header, Footer };
export default Layout;
