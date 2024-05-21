import Link from "next/link";
import React from "react";

const PrimaryButton = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link href={href} className={`px-4 py-1 rounded-sm ${className}`}>
      {children}
    </Link>
  );
};

export default PrimaryButton;
