export default function Footer() {
  return (
    <footer className="footer footer-center bg-blue-600 text-white p-4 h-[55px]">
      <aside>
        <p>
          Copyright © ${new Date().getFullYear()} - All right reserved by
          Cashless Ltd
        </p>
      </aside>
    </footer>
  );
}
