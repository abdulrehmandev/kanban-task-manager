import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed z-50 bottom-0 left-0 right-0 text-center p-1 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <p className="text-[0.68rem] dark:text-gray-400 text-gray-500">
        Designed & Developed by{" "}
        <Link
          className="text-indigo-500"
          href="https://github.com/abdulrehmandev"
          target="_blank"
        >
          abdulrehmandev
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
