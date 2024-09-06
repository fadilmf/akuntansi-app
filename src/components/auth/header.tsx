import Image from "next/image";

interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {/* <h1 className="text-3xl font-semibold">Abimantra</h1> */}
      <Image
        className="px-10 pt-10"
        src={"/logo_web.png"}
        alt="logo_abimantra"
        width={500}
        height={60}
      />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
