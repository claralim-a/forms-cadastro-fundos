import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-full flex justify-end p-4">
      <Image
        src="/generic-logo.png"
        alt="Logo"
        width={160}
        height={40}
        priority
      />
    </div>
  );
}
